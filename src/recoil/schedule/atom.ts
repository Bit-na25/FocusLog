import { atom } from "recoil";
import { ScheduleType } from "./types";
import { localStorageEffect } from "../../utils/recoil/localStorageEffect";
import { SCHEDULE_KEY } from "@/utils/localStorage";

export const scheduleState = atom<ScheduleType[]>({
  key: "scheduleState",
  default: [],
  effects: [localStorageEffect<ScheduleType[]>(SCHEDULE_KEY)],
});
