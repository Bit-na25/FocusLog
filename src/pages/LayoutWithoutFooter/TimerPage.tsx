import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Schedule from "../../components/Schedule";
import { useSetRecoilState } from "recoil";
import { retrospectState } from "../../store/retrospectAtom";
import { RetrospectType } from "../../types/retrospect";

enum TimerStatus {
  READY = "READY",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
}

export default function TimerPage() {
  const { state } = useLocation();
  const scheduleId = state?.scheduleId;
  const navigate = useNavigate();

  const setRetrospect = useSetRecoilState(retrospectState);
  const [status, setStatus] = useState<TimerStatus>(TimerStatus.READY);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleStart = () => {
    setStatus(TimerStatus.RUNNING);
    startTimer();
  };

  const handlePause = () => {
    stopTimer();
    setStatus(TimerStatus.PAUSED);
  };

  const handleResume = () => {
    setStatus(TimerStatus.RUNNING);
    startTimer();
  };

  const handleStop = () => {
    stopTimer();
    setStatus(TimerStatus.READY);
    const focusDuration = time;
    setTime(0);

    const newRetrospect: RetrospectType = {
      id: crypto.randomUUID(),
      scheduleId,
      focusDuration,
      content: "",
    };

    setRetrospect((prev) => [...prev, newRetrospect]);

    navigate("/retrospect", {
      state: { scheduleId },
    });
  };

  const formatTime = (sec: number) => {
    const hrs = String(Math.floor(sec / 3600)).padStart(2, "0");
    const mins = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
    const secs = String(sec % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  return (
    <div className="h-screen bg-neutral-900 text-white px-6">
      <PageHeader title="Timer" isTimer={true} />

      <section className="w-full pt-24">
        {status === TimerStatus.RUNNING ? (
          <div className="w-full aspect-square flex flex-col justify-center items-center">
            <div className="w-full aspect-square rounded-full flex flex-col justify-center items-center bg-gray-800">
              <div className="text-6xl font-bold">{formatTime(time)}</div>
              <p className="text-gray-300 mt-2 text-sm">지금 집중 중...</p>
            </div>
          </div>
        ) : (
          <div className="w-full aspect-square flex justify-center items-center">
            <span className="text-6xl font-bold"> {formatTime(time)}</span>
          </div>
        )}

        <div className="bg-white text-black p-4 mt-6 rounded-lg">
          <Schedule scheduleId={scheduleId} isMini={false} />
        </div>

        <div className="mt-3 flex gap-2">
          {status === TimerStatus.READY ? (
            <button
              onClick={handleStart}
              className="w-full py-3 bg-white text-black font-bold rounded"
            >
              시작
            </button>
          ) : (
            <>
              {status === TimerStatus.RUNNING && (
                <button
                  onClick={handlePause}
                  className="w-1/2 py-3 border border-white text-white rounded"
                >
                  일시정지
                </button>
              )}
              {status === TimerStatus.PAUSED && (
                <button
                  onClick={handleResume}
                  className="w-1/2 py-3 border border-white text-white rounded"
                >
                  계속하기
                </button>
              )}
              <button
                onClick={handleStop}
                className="w-1/2 py-3 bg-white text-black font-bold rounded"
              >
                종료
              </button>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
