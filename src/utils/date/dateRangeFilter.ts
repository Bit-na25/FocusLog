export type DateRange = "1week" | "1month" | "1year";

export function getStartAndEndDate(range: DateRange) {
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
