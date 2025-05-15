import { atom } from "recoil";

export const targetHourAtom = atom<number>({
  key: "targetHourAtom",
  default: 5,
});
