import { useRecoilValue } from "recoil";
import { formatDurationKo } from "../../../utils/date/formatDuration";
import ContentBox from "../../common/ContentBox";
import { targetHourAtom, todayTotalFocusTimeSelector } from "@/recoil";
import { motion } from "framer-motion";

export default function FocusSummary() {
  const todayTotalFocusTime = useRecoilValue(todayTotalFocusTimeSelector);
  const targetHour = useRecoilValue(targetHourAtom);

  const percent = Math.floor((todayTotalFocusTime / (targetHour * 60 * 60)) * 100);

  const color = percent >= 80 ? "bg-green-400" : percent >= 50 ? "bg-yellow-400" : "bg-red-300";

  return (
    <section className="my-6">
      <h2 className="text-lg font-bold mb-1">집중 요약</h2>
      <ContentBox>
        <p className="flex text-sm justify-between">
          목표 시간 <span className="font-bold">{targetHour}시간</span>
        </p>
        <p className="flex text-sm justify-between">
          완료 시간{" "}
          <span className="font-bold">
            {formatDurationKo(todayTotalFocusTime)}({percent}%)
          </span>
        </p>
        <div className="border-t border-gray-300 my-3" />
        <div className="relative w-full h-6 bg-gray-300/50 rounded-lg">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`absolute h-full ${color} rounded-lg`}
          />
        </div>
      </ContentBox>
    </section>
  );
}
