import { atom } from "recoil";

export const targetHourAtom = atom<number>({
  key: "targetHourAtom",
  default: 5,
  effects_UNSTABLE: [
    ({ setSelf, onSet }) => {
      const saved = localStorage.getItem("targetHour");
      if (saved) setSelf(Number(saved));
      onSet((newVal) => {
        localStorage.setItem("targetHour", newVal.toString());
      });
    },
  ],
});
