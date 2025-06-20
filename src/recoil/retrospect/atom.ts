import { atom } from "recoil";
import { RetrospectType } from "./types";
import { localStorageEffect } from "../../utils/recoil/localStorageEffect";
import { RETROSPECT_KEY } from "@/utils/localStorage";

export const retrospectState = atom<RetrospectType[]>({
  key: "retrospectState",
  default: [],
  effects: [localStorageEffect<RetrospectType[]>(RETROSPECT_KEY)],
});
