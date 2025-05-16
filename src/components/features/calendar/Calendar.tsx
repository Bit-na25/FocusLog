import { useRecoilValue } from "recoil";
import { getSchedulesByMonthSelector, categorySelector } from "@/recoil";
import { formatDateOnly } from "../../../utils/date/dateUtils";

interface CalendarProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

export default function Calendar({ selectedDate, onDateChange }: CalendarProps) {
  const monthSchedules = useRecoilValue(getSchedulesByMonthSelector(selectedDate));
  const categories = useRecoilValue(categorySelector);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  // 달의 첫째 날 (ex: 2025-04-01)
  const firstDay = new Date(year, month, 1);
  const firstDayOfWeek = firstDay.getDay(); // 요일 (0=일, 1=월, ..., 6=토)

  // 이달이 며칠까지 있는지
  const lastDate = new Date(year, month + 1, 0).getDate();

  // 날짜 배열 만들기 (빈칸 포함)
  const dates: { date: Date; isCurrentMonth: boolean }[] = [];

  const prevMonthLastDate = new Date(year, month, 0).getDate();
  // 앞에 빈칸 (ex: 1일이 수요일이면 앞에 0,0)
  for (let i = 0; i < firstDayOfWeek; i++) {
    dates.unshift({
      date: new Date(year, month - 1, prevMonthLastDate - i),
      isCurrentMonth: false,
    });
  }

  // 날짜 채우기
  for (let i = 1; i <= lastDate; i++) {
    dates.push({
      date: new Date(year, month, i),
      isCurrentMonth: true,
    });
  }

  // 6줄 7칸 (42개) 채우기
  while (dates.length < 42) {
    const nextDay = dates.length - (firstDayOfWeek + lastDate) + 1;
    dates.push({
      date: new Date(year, month + 1, nextDay),
      isCurrentMonth: false,
    });
  }

  const isSameDay = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  return (
    <div>
      {/* 년/월 표시 */}
      <div className="text-xl font-bold mb-4 tracking-tight">{`${year}년 ${month + 1}월`}</div>

      <div className="mx-[-1rem]">
        {/* 요일 표시 */}
        <div className="grid grid-cols-7 text-center font-semibold text-xs mb-1">
          <div className="text-red-500">일</div>
          <div>월</div>
          <div>화</div>
          <div>수</div>
          <div>목</div>
          <div>금</div>
          <div className="text-blue-500">토</div>
        </div>

        {/* 날짜 그리드 */}
        <div className="grid grid-cols-7 text-center">
          {dates.map(({ date, isCurrentMonth }, idx) => {
            const isSelected = isSameDay(date, selectedDate);
            const day = date.getDay(); // 요일 0=일, 6=토
            const textColor =
              day === 0 ? "text-red-500" : day === 6 ? "text-blue-500" : "text-black";
            const opacity = isCurrentMonth ? "opacity-100" : "opacity-50";
            const schedules = monthSchedules.filter((s) => s.date === formatDateOnly(date));

            return (
              <div key={idx} className="w-full flex flex-col items-center justify-center">
                <div className={`${opacity} mb-1`} onClick={() => onDateChange(date)}>
                  <div
                    className={`w-7 h-7 text-sm flex items-center justify-center ${
                      isSelected ? "bg-primary text-white font-bold rounded-full" : ""
                    } ${textColor}`}
                  >
                    {date.getDate()}
                  </div>
                </div>
                <div className="flex gap-1 mb-3">
                  {schedules.map((s) => {
                    const color = categories.find((e) => e.id === s.category);

                    return (
                      <span key={s.id} className={`w-1 h-1 rounded-full ${color?.color}`}></span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
