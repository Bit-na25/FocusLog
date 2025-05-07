import { atom } from "recoil";

export const calendarSelectedDateState = atom<Date>({
  key: "calendarSelectedDateState",
  default: new Date(),
});
