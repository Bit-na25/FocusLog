import { useRecoilValue } from "recoil";
import { getSchedulesByDateSelector } from "../../store/scheduleSelector";
import CalendarSchedule from "./CalendarSchedule";
import { formatToKoreanDateWithoutYear, formatToDateString } from "../../utils/dateUtils";

interface Props {
  selectedDate: Date;
}

export default function CalendarScheduleList({ selectedDate }: Props) {
  const dateStr = formatToDateString(selectedDate);
  const schedules = useRecoilValue(getSchedulesByDateSelector(dateStr));

  return (
    <section className="my-4 pb-4">
      <h2 className="text-lg font-bold mb-2">{formatToKoreanDateWithoutYear(selectedDate)}</h2>
      {schedules.length > 0 ? (
        <ul className="flex flex-col gap-3">
          {schedules.map((schedule) => (
            <div key={schedule.id}>
              <CalendarSchedule scheduleId={schedule.id} />
            </div>
          ))}
        </ul>
      ) : (
        <div className="flex text-[1.1rem] font-bold">
          <div className="border-l-4 border-gray-500 mr-2" />
          <p className="mr-7 text-gray-400">일정이 없습니다.</p>
        </div>
      )}
    </section>
  );
}
