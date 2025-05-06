import { Link, useLocation } from "react-router-dom";
import UnderLine from "../components/common/UnderLine";
import Calendar from "../features/Calendar/Calendar";
import CalendarScheduleList from "../features/Calendar/CalendarScheduleList";
import { useRecoilState } from "recoil";
import { calendarSelectedDateState } from "../store/calendarAtom";
import { useEffect } from "react";

export default function CalendarPage() {
  const location = useLocation();
  const [selectedDate, setSelectedDate] = useRecoilState(calendarSelectedDateState);

  // useEffect(() => {
  //   console.log(location.state?.from);
  //   if (location.state?.from === "category") setSelectedDate(new Date());
  // }, []);

  return (
    <div className="w-full mt-4">
      <Calendar selectedDate={selectedDate} onDateChange={setSelectedDate} />
      <UnderLine />
      <CalendarScheduleList selectedDate={selectedDate} />
      <Link to="/schedule-form" state={{ selectedDate }}>
        <div className="fixed bottom-24 right-2 px-3 py-2 bg-gray-600 mb-2 text-white rounded-lg shadow-xl">
          + 일정 추가하기
        </div>
      </Link>
    </div>
  );
}
