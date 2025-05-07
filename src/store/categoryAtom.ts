import { atom } from "recoil";
import { CategoryType } from "../types/category";
import { localStorageEffect } from "./utils/localStorageEffect";

const CATEGORY_KEY = "focuslog_categories";

const defaultCategories: CategoryType[] = [
  { id: "1", label: "Study", color: "bg-blue-600" },
  { id: "2", label: "Exercise", color: "bg-green-600" },
  { id: "3", label: "Meeting", color: "bg-purple-600" },
];

export const defaultCategoryColor = [
  "bg-red-600",
  "bg-red-400",
  "bg-red-200",
  "bg-pink-600",
  "bg-pink-400",
  "bg-pink-200",
  "bg-orange-600",
  "bg-orange-400",
  "bg-orange-200",
  "bg-yellow-600",
  "bg-yellow-400",
  "bg-yellow-200",
  "bg-green-600",
  "bg-green-400",
  "bg-green-200",
  "bg-teal-600",
  "bg-teal-400",
  "bg-teal-200",
  "bg-blue-600",
  "bg-blue-400",
  "bg-blue-200",
  "bg-purple-600",
  "bg-purple-400",
  "bg-purple-200",
];

export const categoryState = atom<CategoryType[]>({
  key: "categoryState",
  default: [],
  effects: [localStorageEffect<CategoryType[]>(CATEGORY_KEY, defaultCategories)],
});
