import { atom } from "recoil";
import { RetrospectType } from "../types/retrospect";
import { mockRetrospects } from "./mockRetrospects";

export const retrospectState = atom<RetrospectType[]>({
  key: "retrospectState",
  default: mockRetrospects,
});
