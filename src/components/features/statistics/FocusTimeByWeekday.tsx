import { useRecoilValue } from "recoil";
import { retrospectState } from "../../../features";
import { DateRange } from "../../../utils/date/dateRangeFilter";
import { filterRetrospects } from "../../../utils/filter/filterRetrospects";

const dayLabels = ["일", "월", "화", "수", "목", "금", "토"];
interface FocusTimeByDayProps {
  period: DateRange;
  category: string;
}
export default function FocusTimeByDay({ period, category }: FocusTimeByDayProps) {
  const retrospects = useRecoilValue(retrospectState);
  const filtered = filterRetrospects(retrospects, period, category);
  const focusTimeByDay = Array(dayLabels.length).fill(0);

  filtered.forEach((r) => {
    const date = new Date(r.date);
    const day = date.getDay();
    focusTimeByDay[day] += r.focusDuration || 0;
  });

  const max = Math.max(...focusTimeByDay, 1);

  return (
    <div className="my-4">
      <h2 className="font-bold mb-2">요일별 집중 시간</h2>
      <div className="flex justify-between items-end h-32 px-6">
        {focusTimeByDay.map((v, i) => (
          <div key={i} className="h-full flex flex-col items-center justify-end">
            <div
              className={`w-4 rounded-t ${v === max ? "bg-sky-400" : "bg-gray-400"}`}
              style={{ height: `${(v / max) * 100}%` }}
            ></div>
            <span className="text-sm mt-1">{dayLabels[i]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
