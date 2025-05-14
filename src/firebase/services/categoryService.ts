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
  await addDoc(getCategoryCollectionRef(userId), category);
}

export async function replaceAllCategories(userId: string, categories: Omit<CategoryType, "id">[]) {
  const ref = getCategoryCollectionRef(userId);
  const snapshot = await getDocs(ref);
  const batch = writeBatch(db);

  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  categories.forEach((category) => {
    const docRef = doc(ref); // 자동 ID
    batch.set(docRef, category);
  });

  await batch.commit();
}
