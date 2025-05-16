import { useRecoilValue } from "recoil";
import { categoryByIdSelector, scheduleByIdSelector } from "@/recoil";
import { Link } from "react-router-dom";

interface ScheduleProps {
  scheduleId: string;
  isMini?: boolean;
}

export default function Schedule({ scheduleId, isMini = true }: ScheduleProps) {
  const schedule = useRecoilValue(scheduleByIdSelector(scheduleId));
  const categoryInfo = useRecoilValue(categoryByIdSelector(schedule?.category));

  return (
    <>
      {isMini ? (
        <Link to="/schedule-form" state={{ scheduleId }}>
          <div className="flex text-md font-bold">
            <div className={`shrink-0 w-1 h-6 mr-2 ${categoryInfo.color}`} />
            <p className="mr-7 text-gray-500">{schedule?.time}</p>
            <p className="line-clamp-1 text-ellipsis overflow-hidden">{schedule?.title}</p>
          </div>
        </Link>
      ) : (
        <div className="flex items-center">
          <div className={`shrink-0 w-1 h-12 mr-3 ${categoryInfo.color}`}></div>
          <div>
            <div className="line-clamp-2 text-ellipsis overflow-hidden text-xl font-bold">
              {schedule?.title}
            </div>
            <div className="text-sm text-gray-400 font-bold">시작 {schedule?.time}</div>
          </div>
        </div>
      )}
    </>
  );
}
