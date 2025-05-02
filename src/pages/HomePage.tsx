import UnderLine from "../components/common/UnderLine";
import FocusSummary from "../features/Home/FocusSummary";
import RetrospectBox from "../features/Home/RetrospectBox";
import ScheduleList from "../features/Home/ScheduleList";

export default function HomePage() {
  return (
    <div>
      <header className="py-4 text-xl font-bold">2025년 4월 25일 토요일</header>
      <UnderLine />
      <ScheduleList />
      <FocusSummary />
      <RetrospectBox />
    </div>
  );
}
