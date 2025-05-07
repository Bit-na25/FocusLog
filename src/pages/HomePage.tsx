import UnderLine from "../components/common/UnderLine";
import FocusSummary from "../features/home/FocusSummary";
import RetrospectBox from "../features/home/RetrospectBox";
import ScheduleList from "../features/home/ScheduleList";
import { formatToKoreanDate } from "../utils/dateUtils";

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
