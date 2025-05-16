import { FOCUS_DURATION_KEY } from "@/utils/localStorage";
import { localStorageEffect } from "@/utils/recoil/localStorageEffect";
import { atom } from "recoil";

export const defaultDuration = 5;

export const targetHourAtom = atom<number>({
  key: "targetHourAtom",
  default: 0,
  effects: [localStorageEffect<number>(FOCUS_DURATION_KEY, defaultDuration)],
});
