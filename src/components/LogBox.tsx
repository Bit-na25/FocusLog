import { Link } from "react-router-dom";
import ContentBox from "./common/ContentBox";
import Log from "./Log";
import { retrospectByScheduleIdSelector } from "../store/retrospectSelector";
import { useRecoilValue } from "recoil";
export default function LogBox({ scheduleId }: { scheduleId: string }) {
  const retrospect = useRecoilValue(retrospectByScheduleIdSelector(scheduleId));

  return (
    <ContentBox>
      {retrospect ? (
        <Link to="/retrospect" state={{ scheduleId }}>
          <Log content={retrospect.content} tags={retrospect.tags} />
        </Link>
      ) : (
        <Link to="/timer" state={{ scheduleId }}>
          <div className="text-center text-sm text-gray-400">회고가 아직 없습니다.</div>
        </Link>
      )}
    </ContentBox>
  );
}
