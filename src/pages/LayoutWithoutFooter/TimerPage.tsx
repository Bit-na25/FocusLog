import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "../../components/PageHeader";
import Schedule from "../../components/Schedule";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { retrospectState, RetrospectType, scheduleByIdSelector } from "@/recoil";
import { formatDateOnly } from "../../utils/date/dateUtils";
import { useAuthUser } from "@/hooks/useAuthUser";
import { addRetrospect } from "@/firebase";
import PrimaryButton from "@/components/common/PrimaryButton";
import SecondaryButton from "@/components/common/SecondaryButton";

enum TimerStatus {
  READY = "READY",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
}

export default function TimerPage() {
  const { state } = useLocation();
  const scheduleId = state?.scheduleId;
  const navigate = useNavigate();
  const { userId } = useAuthUser();

  const schedule = useRecoilValue(scheduleByIdSelector(scheduleId));
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
      date: schedule ? schedule.date : formatDateOnly(new Date()),
      focusDuration,
      category: schedule ? schedule.category : "",
      content: "",
    };

    setRetrospect((prev) => [...prev, newRetrospect]);
    if (userId !== null) {
      addRetrospect(userId, newRetrospect);
    }

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

      <section className="pt-24 max-w-md mx-auto">
        <div className="aspect-square flex flex-col justify-center items-center">
          <span
            className={`${status === TimerStatus.RUNNING ? "text-7xl" : "text-6xl"} font-extrabold tracking-widest`}
          >
            {formatTime(time)}
          </span>
          {status === TimerStatus.RUNNING && (
            <p className="text-gray-400 mt-2 tracking-wide animate-pulse">지금 집중 중...</p>
          )}
        </div>

        <div className="bg-white/90 text-black p-4 mt-6 rounded-2xl border-l-4 shadow-lg">
          <Schedule scheduleId={scheduleId} isMini={false} />
        </div>

        <div className="mt-6 flex gap-2">
          {status === TimerStatus.READY ? (
            <PrimaryButton onClick={handleStart} className="w-full">
              시작
            </PrimaryButton>
          ) : (
            <>
              {status === TimerStatus.RUNNING && (
                <SecondaryButton onClick={handlePause} className="w-1/2">
                  일시정지
                </SecondaryButton>
              )}
              {status === TimerStatus.PAUSED && (
                <SecondaryButton onClick={handleResume} className="w-1/2">
                  계속하기
                </SecondaryButton>
              )}

              <PrimaryButton onClick={handleStop} className="w-1/2">
                종료
              </PrimaryButton>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
