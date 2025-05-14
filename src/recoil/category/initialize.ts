import { SetterOrUpdater } from "recoil";
import { CategoryType } from "./types";
import { defaultCategories } from "./default";

export const initializeCategoryState = (set: SetterOrUpdater<CategoryType[]>) => {
  set(defaultCategories);
};
