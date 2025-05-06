import { atom } from "recoil";
import { ScheduleType } from "../types/schedule";
import { localStorageEffect } from "./utils/localStorageEffect";

const STORAGE_KEY = "focuslog_schedules";

export const scheduleState = atom<ScheduleType[]>({
  key: "scheduleState",
  default: [],
  effects: [localStorageEffect<ScheduleType[]>(STORAGE_KEY)],
});
