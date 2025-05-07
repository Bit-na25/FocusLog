import { atom } from "recoil";
import { ScheduleType } from "./types";
import { localStorageEffect } from "../../utils/recoil/localStorageEffect";

const STORAGE_KEY = "focuslog_schedules";

export const scheduleState = atom<ScheduleType[]>({
  key: "scheduleState",
  default: [],
  effects: [localStorageEffect<ScheduleType[]>(STORAGE_KEY)],
});
