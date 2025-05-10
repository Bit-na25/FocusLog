import { useRecoilValue } from "recoil";
import { retrospectState } from "../../../features";
import { formatKoreanDuration } from "../../../utils/date/formatDuration";
import { DateRange, filterRetrospectsByDateRange } from "../../../utils/date/dateRangeFilter";

interface FocusTimeByWeekdayProps {
  period: DateRange;
}

export default function FocusTimeByWeekday({ period }: FocusTimeByWeekdayProps) {
  const retrospects = useRecoilValue(retrospectState);
  const filtered = filterRetrospectsByDateRange(retrospects, period);
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
