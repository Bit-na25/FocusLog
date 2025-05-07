import { atom } from "recoil";
import { CategoryType } from "./types";
import { localStorageEffect } from "../../utils/recoil/localStorageEffect";
import { defaultCategories } from "./default";

const CATEGORY_KEY = "focuslog_categories";

export const categoryState = atom<CategoryType[]>({
  key: "categoryState",
  default: [],
  effects: [localStorageEffect<CategoryType[]>(CATEGORY_KEY, defaultCategories)],
});
