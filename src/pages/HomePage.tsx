import UnderLine from "../components/common/UnderLine";
import FocusSummary from "../components/features/home/FocusSummary";
import RetrospectBox from "../components/features/home/RetrospectBox";
import ScheduleList from "../components/features/home/ScheduleList";
import { formatToKoreanDate } from "../utils/date/dateUtils";

export default function HomePage() {
  const today = new Date();

  return (
    <div>
      <header className="py-4 text-xl font-bold">{formatToKoreanDate(today)}</header>
      <UnderLine />
      <ScheduleList />
      <FocusSummary />
      <RetrospectBox />
    </div>
  );
}
