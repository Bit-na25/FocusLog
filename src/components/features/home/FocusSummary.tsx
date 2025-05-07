import { useRecoilValue } from "recoil";
import { todayTotalFocusTimeSelector, targetHourAtom } from "../../../features";
import { formatKoreanDuration } from "../../../utils/date/formatDuration";
import ContentBox from "../../common/ContentBox";

export default function FocusSummary() {
  const todayTotalFocusTime = useRecoilValue(todayTotalFocusTimeSelector);
  const targetHour = useRecoilValue(targetHourAtom);

  const percent = Math.floor((todayTotalFocusTime / (targetHour * 60 * 60)) * 100);

  return (
    <section className="my-8">
      <h2 className="text-xl font-bold mb-2">집중 요약</h2>
      <ContentBox>
        <p className="flex justify-between">
          목표 시간 <span className="font-bold">{targetHour}시간</span>
        </p>
        <p className="flex justify-between">
          완료 시간{" "}
          <span className="font-bold">
            {formatKoreanDuration(todayTotalFocusTime)}({percent}%)
          </span>
        </p>
        <div className="border-t border-gray-300 my-3" />
        <div className="relative w-full h-8 bg-gray-300/50 rounded-lg">
          <div
            className="absolute h-4/5 bg-green-400 rounded-lg left-1 top-1 transform -transform-y-1/2"
            style={{ width: `${percent}%` }}
          ></div>
        </div>
      </ContentBox>
    </section>
  );
}
