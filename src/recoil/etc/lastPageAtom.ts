import { atom } from "recoil";

export const lastPageState = atom<string>({
  key: "lastPageState",
  default: "",
});
