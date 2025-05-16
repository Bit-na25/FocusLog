import { useRecoilValue } from "recoil";
import { getSchedulesByDateSelector } from "@/recoil";
import { formatToKoreanDateWithoutYear, formatDateOnly } from "../../../utils/date/dateUtils";
import CalendarSchedule from "./CalendarSchedule";

interface Props {
  selectedDate: Date;
}

export default function CalendarScheduleList({ selectedDate }: Props) {
  const dateStr = formatDateOnly(selectedDate);
  const schedules = useRecoilValue(getSchedulesByDateSelector(dateStr));

  return (
    <section className="my-3 pb-4">
      <h2 className="font-bold mb-2 tracking-tight">
        {formatToKoreanDateWithoutYear(selectedDate)}
      </h2>
      {schedules.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {schedules.map((schedule) => (
            <div key={schedule.id}>
              <CalendarSchedule scheduleId={schedule.id} />
            </div>
          ))}
        </ul>
      ) : (
        <div className="flex font-bold">
          <div className="border-l-4 border-gray-500 mr-2" />
          <p className="mr-7 text-gray-400">일정이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
