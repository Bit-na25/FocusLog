import { ScheduleType } from "../../features";
import { DateRange, getStartAndEndDate } from "../date/dateRangeFilter";

export function filterSchedules(
  schedules: ScheduleType[],
  period: DateRange,
  category: string, // 'all' or category.id
) {
  const { startDate, today } = getStartAndEndDate(period);

  return schedules.filter((r) => {
    const date = new Date(`${r.date}T00:00:00`);
    const inRange = date >= startDate && date <= today;
    const categoryMatch = category === "all" || r.category === category;

    return inRange && categoryMatch;
  });
}
