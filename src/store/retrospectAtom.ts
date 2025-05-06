import { atom } from "recoil";
import { RetrospectType } from "../types/retrospect";
import { localStorageEffect } from "./utils/localStorageEffect";

const RETROSPECT_KEY = "focuslog_retrospects";

export const retrospectState = atom<RetrospectType[]>({
  key: "retrospectState",
  default: [],
  effects: [localStorageEffect<RetrospectType[]>(RETROSPECT_KEY)],
});
