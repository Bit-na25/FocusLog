import { useEffect, useState } from "react";
import ContentBox from "../../common/ContentBox";
import Log from "../../Log";
import { useRecoilValue } from "recoil";
import { retrospectState, scheduleState } from "@/recoil";
import { DateRange } from "../../../utils/date/dateRangeFilter";
import { filterSchedules } from "../../../utils/filter/filterSchedules";
import { filterRetrospects } from "../../../utils/filter/filterRetrospects";
import { motion } from "framer-motion";

interface RetrospectCompletionRateProps {
  period: DateRange;
  category: string;
}

export default function RetrospectCompletionRate({
  period,
  category,
}: RetrospectCompletionRateProps) {
  const [showIndex, setShowIndex] = useState(-1);
  const schedules = useRecoilValue(scheduleState);
  const filteredSchedules = filterSchedules(schedules, period, category);
  const retrospects = useRecoilValue(retrospectState);
  const filteredRetrospects = filterRetrospects(
    retrospects.filter((r) => r.content || r.tags?.length),
    period,
    category,
  );
  const completionRate = Math.floor(
    filteredSchedules.length === 0
      ? 0
      : (filteredRetrospects.length / filteredSchedules.length) * 100,
  );
  const circumference = 2 * Math.PI * 16; // 반지름 r = 16
  const offset = circumference * (1 - completionRate / 100);

  useEffect(() => {
    setShowIndex(Math.floor(Math.random() * filteredRetrospects.length));
  }, []);

  return (
    <div className="pb-6">
      <p className="font-bold mb-2">회고 작성률</p>
      <ContentBox>
        <div className="flex items-center gap-3">
          <div className="relative w-16 h-16 shrink-0">
            <svg viewBox="0 0 36 36" className="w-full h-full">
              <circle cx="18" cy="18" r="16" fill="none" stroke="#eee" strokeWidth="4" />
              <motion.circle
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                cx="18"
                cy="18"
                r="16"
                fill="none"
                stroke="#793DF9"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeLinecap="round"
                transform="rotate(-90 18 18)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">
              {completionRate}%
            </div>
          </div>
          {filteredRetrospects.length > 0 ? (
            <Log
              content={filteredRetrospects[showIndex]?.content}
              tags={filteredRetrospects[showIndex]?.tags}
            />
          ) : (
            <div>
              <p>작성된 회고가 없습니다.</p>
              <p className="text-sm">* 회고는 타이머 완료 후 작성할 수 있어요.</p>
            </div>
          )}
        </div>
      </ContentBox>
    </div>
  );
}
