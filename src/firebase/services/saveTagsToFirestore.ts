import { replaceAllTags } from "./tagService";

export async function saveTagsToFirestore(userId: string, tags: string[]) {
  if (!userId) return;
  await replaceAllTags(userId, tags);
}
