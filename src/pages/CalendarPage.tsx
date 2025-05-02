import { Link } from "react-router-dom";
import UnderLine from "../components/common/UnderLine";
import Calendar from "../features/Calendar/Calendar";
import ScheduleList from "../features/Calendar/ScheduleList";

export default function CalendarPage() {
  return (
    <div className="w-full mt-4 font-bold">
      <Calendar />
      <UnderLine />
      <ScheduleList />
      <Link to="/schedule-form">
        <div className="fixed bottom-24 right-2 px-3 py-2 bg-gray-600 mb-2 text-white rounded-lg shadow-xl">
          + 일정 추가하기
        </div>
      </Link>
    </div>
  );
}
