import { RetrospectType } from "@/recoil";
import { DateRange, getStartAndEndDate } from "../date/dateRangeFilter";

export function filterRetrospects(
  retrospects: RetrospectType[],
  period: DateRange,
  category: string, // 'all' or category.id
) {
  const { startDate, today } = getStartAndEndDate(period);

  return retrospects.filter((r) => {
    const date = new Date(`${r.date}T00:00:00`);
    const inRange = date >= startDate && date <= today;
    const categoryMatch = category === "all" || r.category === category;

    return inRange && categoryMatch;
  });
}
