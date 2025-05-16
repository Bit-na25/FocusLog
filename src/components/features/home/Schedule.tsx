import { useRecoilValue } from "recoil";
import {
  categoryByIdSelector,
  retrospectByScheduleIdSelector,
  scheduleByIdSelector,
} from "@/recoil";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

interface ScheduleProps {
  scheduleId: string;
}

export default function Schedule({ scheduleId }: ScheduleProps) {
  const schedule = useRecoilValue(scheduleByIdSelector(scheduleId));
  const categoryInfo = useRecoilValue(categoryByIdSelector(schedule?.category));
  const retrospect = useRecoilValue(retrospectByScheduleIdSelector(scheduleId));

  return (
    <Link
      to={retrospect ? "/retrospect" : "/timer"}
      state={{ scheduleId }}
      className="flex items-center justify-between hover:bg-gray-50 cursor-pointer transition"
    >
      <div className="flex font-bold">
        <div className={`shrink-0 w-1 h-6 mr-2 ${categoryInfo.color}`} />
        <p className="mr-7 text-gray-500">{schedule?.time}</p>
        <p className="line-clamp-1 text-ellipsis overflow-hidden">{schedule?.title}</p>
      </div>
      <FaCheckCircle
        className={`shrink-0 mx-2 text-lg ${retrospect ? "text-green-700" : "text-gray-300"}`}
        title={`${retrospect && "회고 완료됨"}`}
      />
    </Link>
  );
}
