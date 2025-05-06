import { ScheduleType } from "../../types/schedule";

export function sortSchedulesByTime(schedules: ScheduleType[]): ScheduleType[] {
  return [...schedules].sort((a, b) => a.time.localeCompare(b.time));
}
