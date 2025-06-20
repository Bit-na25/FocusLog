import { selector, selectorFamily } from "recoil";
import { CategoryType } from "./types";
import { categoryState } from "./atom";

export const categorySelector = selector<CategoryType[]>({
  key: "categorySelector",
  get: ({ get }) => {
    const categories = get(categoryState);
    return categories;
  },
});

export const categoryByIdSelector = selectorFamily<CategoryType, string | undefined>({
  key: "categoryByIdSelector",
  get:
    (categoryId) =>
    ({ get }) => {
      const categories = get(categoryState);
      const data = categories.find((cat) => cat.id === categoryId);
      return data ?? { id: "", label: "", color: "bg-gray-400" };
    },
});
