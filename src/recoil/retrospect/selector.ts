import { selector, selectorFamily } from "recoil";
import { RetrospectType } from "./types";
import { retrospectState } from "./atom";
import { todayScheduleIdsSelector } from "../schedule/selector";

export const retrospectByScheduleIdSelector = selectorFamily<RetrospectType | undefined, string>({
  key: "retrospectByScheduleIdSelector",
  get:
    (scheduleId: string) =>
    ({ get }) => {
      const retrospects = get(retrospectState);
      return retrospects.find((r) => r.scheduleId === scheduleId);
    },
});

export const todayRetrospectSelector = selector<RetrospectType[]>({
  key: "todayRetrospectSelector",
  get: ({ get }) => {
    const scheduleIds = get(todayScheduleIdsSelector);
    const retrospects = get(retrospectState);

    return retrospects.filter((r) => scheduleIds.includes(r.scheduleId));
  },
});

export const todayTotalFocusTimeSelector = selector<number>({
  key: "todayTotalFocusTimeSelector",
  get: ({ get }) => {
    const scheduleIds = get(todayScheduleIdsSelector);
    const retrospects = get(retrospectState);

    const total = retrospects
      .filter((r) => scheduleIds.includes(r.scheduleId))
      .reduce((sum, r) => sum + (r.focusDuration || 0), 0);

    return total;
  },
});
