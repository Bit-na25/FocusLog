import { atom } from "recoil";
import { CategoryType } from "../types/category";
import { localStorageEffect } from "./utils/localStorageEffect";

const CATEGORY_KEY = "focuslog_categories";

const defaultCategories: CategoryType[] = [
  { id: 1, label: "Study", color: "bg-blue-500" },
  { id: 2, label: "Exercise", color: "bg-green-500" },
  { id: 3, label: "Meeting", color: "bg-purple-500" },
];

export const categoryState = atom<CategoryType[]>({
  key: "categoryState",
  default: [],
  effects: [localStorageEffect<CategoryType[]>(CATEGORY_KEY, defaultCategories)],
});
