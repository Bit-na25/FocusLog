import { useSetRecoilState } from "recoil";
import UnderLine from "../components/common/UnderLine";
import FocusSummary from "../components/features/home/FocusSummary";
import RetrospectBox from "../components/features/home/RetrospectBox";
import ScheduleList from "../components/features/home/ScheduleList";
import { formatToKoreanDate } from "../utils/date/dateUtils";
import { calendarSelectedDateState, lastPageState } from "@/recoil";
import { useEffect } from "react";

export default function HomePage() {
  const setSelectedDate = useSetRecoilState(calendarSelectedDateState);
  const setLastPage = useSetRecoilState(lastPageState);
  const today = new Date();

  useEffect(() => {
    setSelectedDate(today);
    setLastPage("/");
  }, []);

  return (
    <div>
      <header className="py-4 text-xl font-bold tracking-tight">{formatToKoreanDate(today)}</header>
      <UnderLine />
      <ScheduleList />
      <FocusSummary />
      <RetrospectBox />
    </div>
  );
}
