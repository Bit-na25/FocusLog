import { Link } from "react-router-dom";
import UnderLine from "../components/common/UnderLine";
import Calendar from "../components/features/calendar/Calendar";
import CalendarScheduleList from "../components/features/calendar/CalendarScheduleList";
import { useRecoilState, useSetRecoilState } from "recoil";
import { calendarSelectedDateState, lastPageState } from "@/recoil";
import { useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useRecoilState(calendarSelectedDateState);
  const setLastPage = useSetRecoilState(lastPageState);

  useEffect(() => {
    setLastPage("/calendar");
  }, []);

  return (
    <div className="w-full mt-4">
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <UnderLine />
      <CalendarScheduleList selectedDate={selectedDate} />
      <Link
        to="/schedule-form"
        state={{ selectedDate }}
        className="fixed bottom-28 right-4 w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center transition hover:bg-primary/80 hover:scale-110"
        aria-label="일정 추가하기"
      >
        <FaPlusCircle className="text-3xl" />
      </Link>
    </div>
  );
}
