// src/features/user/userAtom.ts
import { atom } from "recoil";
import { User } from "firebase/auth";

export const userAtom = atom<User | null>({
  key: "userAtom",
  default: null,
});
