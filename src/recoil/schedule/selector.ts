import { selector, selectorFamily } from "recoil";
import { ScheduleType } from "./types";
import { scheduleState } from "./atom";
import { formatDateOnly } from "../../utils/date/dateUtils";
import { sortSchedulesByTime } from "../../utils/recoil/scheduleTimeSort";

export const scheduleByIdSelector = selectorFamily<ScheduleType | undefined, string>({
  key: "retrospectByScheduleIdSelector",
  get:
    (id: string) =>
    ({ get }) => {
      const schedules = get(scheduleState);
      return schedules.find((s) => s.id === id);
    },
});

export const todayScheduleSelector = selector<ScheduleType[]>({
  key: "todayScheduleSelector",
  get: ({ get }) => {
    const allSchedules = get(scheduleState);
    const today = formatDateOnly(new Date());

    return sortSchedulesByTime(allSchedules.filter((item) => item.date === today));
  },
});

export const todayScheduleIdsSelector = selector<string[]>({
  key: "todayScheduleIdsSelector",
  get: ({ get }) => {
    const todaySchedules = get(todayScheduleSelector);
    return todaySchedules.map((s) => s.id);
  },
});

export const getSchedulesByDateSelector = selectorFamily<ScheduleType[], string>({
  key: "getSchedulesByDateSelector",
  get:
    (targetDate: string) =>
    ({ get }) => {
      const allSchedules = get(scheduleState);
      return sortSchedulesByTime(allSchedules.filter((schedule) => schedule.date === targetDate));
    },
});

export const getSchedulesByMonthSelector = selectorFamily<ScheduleType[], Date>({
  key: "getSchedulesByMonthSelector",
  get:
    (date: Date) =>
    ({ get }) => {
      const monthStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      const all = get(scheduleState);
      return all.filter((s) => s.date.startsWith(monthStr));
    },
});
