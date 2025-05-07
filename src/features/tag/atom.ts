import { atom } from "recoil";
import { localStorageEffect } from "../../utils/recoil/localStorageEffect";
import { defaultTags } from "./default";

const TAG_KEY = "focuslog_tags";

export const tagState = atom<string[]>({
  key: "tagState",
  default: [],
  effects: [localStorageEffect<string[]>(TAG_KEY, defaultTags)],
});
