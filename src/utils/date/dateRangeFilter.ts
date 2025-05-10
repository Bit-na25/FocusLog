import { RetrospectType, ScheduleType } from "../../features";

export type DateRange = "1week" | "1month" | "1year";

function getStartAndEndDate(range: DateRange) {
  const today = new Date();
  const startDate = new Date();

  switch (range) {
    case "1week":
      startDate.setDate(today.getDate() - 6); // 오늘 포함 7일
      break;
    case "1month":
      startDate.setMonth(today.getMonth() - 1);
      break;
    case "1year":
      startDate.setFullYear(today.getFullYear() - 1);
      break;
  }

  return { startDate, today };
}

export function filterRetrospectsByDateRange(retrospects: RetrospectType[], range: DateRange) {
  const { startDate, today } = getStartAndEndDate(range);

  return retrospects.filter((r) => {
    const retrospectDate = new Date(`${r.date}T00:00:00`);
    return retrospectDate >= startDate && retrospectDate <= today;
  });
}

export function filterSchedulesByDateRange(schedules: ScheduleType[], range: DateRange) {
  const { startDate, today } = getStartAndEndDate(range);

  return schedules.filter((s) => {
    const scheduleDate = new Date(`${s.date}T00:00:00`);
    return scheduleDate >= startDate && scheduleDate <= today;
  });
}
