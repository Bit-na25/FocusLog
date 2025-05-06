import { atom } from "recoil";
import { CategoryType } from "../types/category";

export const categoryState = atom<CategoryType[]>({
  key: "categoryState",
  default: [
    { id: 1, label: "공부", color: "bg-blue-500" },
    { id: 2, label: "코딩", color: "bg-purple-500" },
    { id: 3, label: "운동", color: "bg-green-500" },
  ],
});
