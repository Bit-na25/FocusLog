import { useRecoilValue } from "recoil";
import { retrospectState } from "@/recoil";
import { DateRange } from "../../../utils/date/dateRangeFilter";
import { filterRetrospects } from "../../../utils/filter/filterRetrospects";
import { formatDurationKo } from "@/utils/date/formatDuration";
import { motion } from "framer-motion";

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
    <div className="my-3">
      <h2 className="font-bold mb-2">요일별 집중 시간</h2>
      <div className="flex justify-between items-end h-24 px-6">
        {focusTimeByDay.map((v, i) => {
          const rate = Math.floor((v / max) * 100);

          return (
            <div key={i} className="h-full flex flex-col items-center justify-end">
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${rate}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className={`w-3.5 rounded-t ${v === max ? "bg-primary/80" : "bg-gray-300"}`}
                title={`${formatDurationKo(v)}`}
              />
              <span className="text-xs mt-1">{dayLabels[i]}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
