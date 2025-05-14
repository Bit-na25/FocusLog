import { atom } from "recoil";
import { localStorageEffect } from "../../utils/recoil/localStorageEffect";
import { defaultTags } from "./default";
import { TAG_KEY } from "@/utils/localStorage";

export const tagState = atom<string[]>({
  key: "tagState",
  default: [],
  effects: [localStorageEffect<string[]>(TAG_KEY, defaultTags)],
});
