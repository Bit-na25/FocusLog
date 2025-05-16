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
import AlertPopup from "@/components/common/AlertPopup";
import toast from "react-hot-toast";

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
  const [prevStatus, setPrevStatus] = useState<TimerStatus>(TimerStatus.READY);
  const [time, setTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showAlert, setShowAlert] = useState(false);

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

  const handleStop = async () => {
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
      tags: [],
    };

    if (userId !== null) {
      const newId = await addRetrospect(userId, newRetrospect);
      newRetrospect.id = newId;
    }

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

  const handleBack = () => {
    setPrevStatus(status);
    if (status === TimerStatus.READY) {
      navigate(-1);
    } else {
      handlePause();
      setShowAlert(true);
    }
  };

  return (
    <div className="h-screen bg-neutral-900 text-white px-6">
      <PageHeader title="Timer" isTimer={true} onBack={handleBack} />

      <section className="pt-16 max-w-md mx-auto">
        <div className="aspect-square flex flex-col justify-center items-center">
          <span className="text-5xl font-extrabold tracking-widest">{formatTime(time)}</span>
          {status === TimerStatus.RUNNING && (
            <p className="text-gray-400 text-sm mt-2 tracking-wide animate-pulse">
              지금 집중 중...
            </p>
          )}
        </div>

        <div className="bg-white/90 text-black p-3 rounded-2xl border-l-4 shadow-lg">
          <Schedule scheduleId={scheduleId} isMini={false} />
        </div>

        <div className="mt-3 flex gap-2">
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
      <AlertPopup
        open={showAlert}
        message="집중 모드를 종료하시겠습니까?
        * 타이머가 중지되고 기록이 저장되지 
        않습니다."
        onConfirm={() => navigate(-1)}
        onClose={() => {
          setShowAlert(false);
          if (prevStatus === TimerStatus.RUNNING) handleResume();
        }}
      />
    </div>
  );
}
