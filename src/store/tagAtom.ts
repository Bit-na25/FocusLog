import { atom } from "recoil";
import { localStorageEffect } from "./utils/localStorageEffect";

const TAG_KEY = "focuslog_tags";

const defaultTags: string[] = ["집중됨", "뿌듯함", "힘듦", "피곤함"];

export const tagState = atom<string[]>({
  key: "tagState",
  default: [],
  effects: [localStorageEffect<string[]>(TAG_KEY, defaultTags)],
});
