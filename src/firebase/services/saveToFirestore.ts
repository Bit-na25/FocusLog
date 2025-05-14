import { CategoryType } from "@/recoil";
import { replaceAllCategories } from "./categoryService";
import { replaceAllTags } from "./tagService";

export async function saveTagsToFirestore(userId: string, tags: string[]) {
  if (!userId) return;
  await replaceAllTags(userId, tags);
}

export async function saveCategoriesToFirestore(
  userId: string,
  categories: Omit<CategoryType, "id">[],
) {
  await replaceAllCategories(userId, categories);
}
