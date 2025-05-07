import { SetterOrUpdater } from "recoil";
import { CategoryType } from "../types/category";

export const defaultCategories: CategoryType[] = [
  { id: "1", label: "Study", color: "bg-blue-600" },
  { id: "2", label: "Exercise", color: "bg-green-600" },
  { id: "3", label: "Meeting", color: "bg-purple-600" },
];

export const defaultTags: string[] = ["집중됨", "뿌듯함", "힘듦", "피곤함"];

export const initializeCategoryState = (set: SetterOrUpdater<CategoryType[]>) => {
  set(defaultCategories);
};

export const initializeTagState = (set: SetterOrUpdater<string[]>) => {
  set(defaultTags);
};
