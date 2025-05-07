import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { todayScheduleSelector } from "../../../features";
import Schedule from "../../Schedule";

export default function ScheduleList() {
  const todaySchedules = useRecoilValue(todayScheduleSelector);

  return (
    <section className="my-4">
      {todaySchedules.length > 0 ? (
        <ul className="my-3.5 flex flex-col gap-3">
          {todaySchedules.map((item) => (
            <Schedule key={item.id} scheduleId={item.id} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 w-full text-center pt-2 pb-6 font-bold">
          오늘 일정이 없습니다.
        </p>
      )}
      <Link to="/schedule-form">
        <div className="w-full border border-gray-300 p-2 rounded-lg text-center">
          + 일정 추가하기
        </div>
      </Link>
    </section>
  );
}
