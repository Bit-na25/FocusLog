import { useState } from "react";
import UnderLine from "../components/common/UnderLine";
import TotalFocusTime from "../components/features/statistics/TotalFocusTime";
import FocusTimeByWeekday from "../components/features/statistics/FocusTimeByWeekday";
import TagStatistics from "../components/features/statistics/TagStatistics";
import RetrospectCompletionRate from "../components/features/statistics/RetrospectCompletionRate";
import { DateRange } from "../utils/date/dateRangeFilter";

export default function StatisticsPage() {
  const [period, setPeriod] = useState<DateRange>("1week");
  const [category, setCategory] = useState("all");

  return (
    <div>
      <header className="py-4 text-xl font-bold text-center">통계</header>

      <div className="flex gap-2 mb-4">
        <select
          className="border rounded p-2 flex-1 bg-white"
          value={period}
          onChange={(e) => setPeriod(e.target.value as DateRange)}
        >
          <option value="1week">최근 1주</option>
          <option value="1month">최근 1개월</option>
          <option value="1year">최근 1년</option>
        </select>
        <select
          className="border rounded p-2 flex-1 bg-white"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">카테고리 전체</option>
          <option value="study">Study</option>
          <option value="meeting">Meeting</option>
        </select>
      </div>
      <UnderLine />

      <TotalFocusTime period={period} />
      <hr className="my-4" />

      <FocusTimeByWeekday period={period} />
      <hr className="my-4" />

      <TagStatistics period={period} />
      <hr className="my-4" />

      <RetrospectCompletionRate period={period} />
    </div>
  );
}
