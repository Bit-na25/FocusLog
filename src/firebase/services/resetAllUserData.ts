import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { defaultCategories, defaultTags } from "@/recoil";

const getSubCol = (userId: string, path: string) => collection(db, `users/${userId}/${path}`);

export async function resetAllUserData(userId: string) {
  const batch = writeBatch(db);

  const collections = ["tags", "categories", "schedules", "retrospects"];

  for (const col of collections) {
    const snapshot = await getDocs(getSubCol(userId, col));
    snapshot.docs.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
  }

  const tagRef = getSubCol(userId, "tags");
  defaultTags.forEach((tag) => {
    const docRef = doc(tagRef);
    batch.set(docRef, { label: tag });
  });

  const categoryRef = getSubCol(userId, "categories");
  defaultCategories.forEach((category) => {
    const docRef = doc(categoryRef);
    batch.set(docRef, {
      label: category.label,
      color: category.color,
    });
  });

  const userDoc = doc(db, `users/${userId}`);
  batch.set(userDoc, { focusDuration: 5 }, { merge: true });

  await batch.commit();
}
