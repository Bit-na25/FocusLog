import { useRecoilValue } from "recoil";
import { retrospectState } from "@/recoil";
import { splitDuration } from "../../../utils/date/formatDuration";
import { DateRange } from "../../../utils/date/dateRangeFilter";
import { filterRetrospects } from "../../../utils/filter/filterRetrospects";
import ContentBox from "@/components/common/ContentBox";
import { IoMdTime } from "react-icons/io";

interface FocusTimeByWeekdayProps {
  period: DateRange;
  category: string;
}

export default function FocusTimeByWeekday({ period, category }: FocusTimeByWeekdayProps) {
  const retrospects = useRecoilValue(retrospectState);
  const filtered = filterRetrospects(retrospects, period, category);
  const todayTotalFocusTime = filtered.reduce((sum, r) => sum + (r.focusDuration || 0), 0);
  const { h, m, s } = splitDuration(todayTotalFocusTime);

  return (
    <div className="my-4">
      <ContentBox>
        <div className="py-1 flex justify-between items-center">
          <h2 className="font-bold flex items-center text-xl ">
            <IoMdTime className="text-primary text-4xl mr-1" />총 집중 시간
          </h2>
          <div className="text-2xl font-bold text-primary">
            {h > 0 ? (
              <>
                <span className="text-4xl">{h}</span>시 <span className="text-4xl">{m}</span>분
              </>
            ) : (
              <>
                <span className="text-4xl">{m}</span>분 <span className="text-4xl">{s}</span>초
              </>
            )}
          </div>
        </div>
      </ContentBox>
    </div>
  );
}
