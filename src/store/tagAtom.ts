import { atom } from "recoil";

export const tagState = atom<string[]>({
  key: "tagState",
  default: [
    "집중됨",
    "뿌듯함",
    "힘듦",
    "피곤함",
    "11111",
    "2222",
    "3333",
    "44444",
    "555",
    "6ㅈㅂㅁㄷ",
    "아무말",
  ],
});
