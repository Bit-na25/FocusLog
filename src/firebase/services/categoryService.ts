import { CategoryType } from "@/recoil";
import { collection, getDocs, writeBatch, doc, addDoc } from "firebase/firestore";
import { db } from "@/firebase";

const getCategoryCollectionRef = (userId: string) => collection(db, `users/${userId}/categories`);

export async function getCategories(userId: string): Promise<CategoryType[]> {
  const snapshot = await getDocs(getCategoryCollectionRef(userId));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<CategoryType, "id">),
  }));
}

export async function addCategory(userId: string, category: Omit<CategoryType, "id">) {
  const docRef = await addDoc(getCategoryCollectionRef(userId), category);
  return docRef.id;
}

export type CategorySyncResult = {
  added: CategoryType[];
  updated: CategoryType[];
  deleted: string[]; // 삭제된 문서 ID들
};

export async function syncCategoriesToFirestore(
  userId: string,
  categories: CategoryType[],
): Promise<CategorySyncResult> {
  const ref = getCategoryCollectionRef(userId);
  const snapshot = await getDocs(ref);
  const batch = writeBatch(db);

  const existingDocs = new Map<string, CategoryType>();

  snapshot.forEach((doc) => {
    existingDocs.set(doc.id, { ...(doc.data() as CategoryType), id: doc.id });
  });

  const added: CategoryType[] = [];
  const updated: CategoryType[] = [];
  const incomingIds = new Set<string>();

  for (const category of categories) {
    const id = (category as CategoryType).id;

    if (id && existingDocs.has(id)) {
      // 🔄 수정
      const { id: _id, ...dataWithoutId } = category;
      batch.set(doc(ref, id), dataWithoutId);
      updated.push({ ...dataWithoutId, id });
      incomingIds.add(id);
    } else {
      // ➕ 추가
      const { id: _id, ...dataWithoutId } = category;
      const docRef = await addDoc(ref, dataWithoutId);
      added.push({ ...dataWithoutId, id: docRef.id });
    }
  }

  const deleted: string[] = [];
  for (const [id] of existingDocs) {
    if (!incomingIds.has(id)) {
      batch.delete(doc(ref, id));
      deleted.push(id);
    }
  }

  await batch.commit();

  return { added, updated, deleted };
}
