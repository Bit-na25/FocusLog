import { atom } from "recoil";
import { CategoryType } from "./types";
import { localStorageEffect } from "../../utils/recoil/localStorageEffect";
import { defaultCategories } from "./default";
import { CATEGORY_KEY } from "@/utils/localStorage";

export const categoryState = atom<CategoryType[]>({
  key: "categoryState",
  default: defaultCategories,
  effects: [localStorageEffect<CategoryType[]>(CATEGORY_KEY, defaultCategories)],
});
