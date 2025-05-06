import { atom } from "recoil";
import { ScheduleType } from "../types/schedule";
import { mockSchedules } from "./mockSchedules";

export const scheduleState = atom<ScheduleType[]>({
  key: "scheduleState",
  default: mockSchedules,
});
