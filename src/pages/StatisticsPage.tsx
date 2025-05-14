import { useState } from "react";
import UnderLine from "../components/common/UnderLine";
import TotalFocusTime from "../components/features/statistics/TotalFocusTime";
import FocusTimeByWeekday from "../components/features/statistics/FocusTimeByWeekday";
import TagStatistics from "../components/features/statistics/TagStatistics";
import RetrospectCompletionRate from "../components/features/statistics/RetrospectCompletionRate";
import { DateRange } from "../utils/date/dateRangeFilter";
import { useRecoilValue } from "recoil";
import { categoryState } from "@/recoil";
import CategorySelect from "../components/features/statistics/CategorySelect";
import PeriodSelect from "../components/features/statistics/PeriodSelect";

export default function StatisticsPage() {
  const [period, setPeriod] = useState<DateRange>("1week");
  const categories = useRecoilValue(categoryState);
  const [category, setCategory] = useState("all");

  return (
    <div>
      <header className="py-4 text-xl font-bold text-center">통계</header>

      <div className="flex gap-2 mb-4">
        <div className="flex-1">
          <PeriodSelect period={period} setPeriod={(e) => setPeriod(e)} />
        </div>
        <div className="flex-1">
          <CategorySelect
            category={category}
            setCategory={(c) => setCategory(c)}
            categories={categories}
          />
        </div>
      </div>
      <UnderLine />

      <TotalFocusTime period={period} category={category} />
      <hr className="my-4" />

      <FocusTimeByWeekday period={period} category={category} />
      <hr className="my-4" />

      <TagStatistics period={period} category={category} />
      <hr className="my-4" />

      <RetrospectCompletionRate period={period} category={category} />
    </div>
  );
}
