import { useRecoilValue } from "recoil";
import { retrospectState } from "../../../features";
import { formatKoreanDuration } from "../../../utils/date/formatDuration";
import { DateRange } from "../../../utils/date/dateRangeFilter";
import { filterRetrospects } from "../../../utils/filter/filterRetrospects";

interface FocusTimeByWeekdayProps {
  period: DateRange;
  category: string;
}

export default function FocusTimeByWeekday({ period, category }: FocusTimeByWeekdayProps) {
  const retrospects = useRecoilValue(retrospectState);
  const filtered = filterRetrospects(retrospects, period, category);
  const todayTotalFocusTime = filtered.reduce((sum, r) => sum + (r.focusDuration || 0), 0);

  return (
    <div className="my-4 flex justify-between items-center">
      <h2 className="font-bold">총 집중 시간</h2>
      <p className="text-2xl font-bold">
        <span className="text-2xl">{formatKoreanDuration(todayTotalFocusTime)}</span>
      </p>
    </div>
  );
}
