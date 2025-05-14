import { db } from "@/firebase";
import { collection, getDocs, doc, writeBatch } from "firebase/firestore";

const getTagCollectionRef = (userId: string) => collection(db, `users/${userId}/tags`);

export async function getTags(userId: string): Promise<string[]> {
  const snapshot = await getDocs(getTagCollectionRef(userId));
  return snapshot.docs.map((doc) => doc.data().label);
}

export async function addTags(userId: string, labels: string[]) {
  const batch = writeBatch(db);
  const tagRef = getTagCollectionRef(userId);

  labels.forEach((label) => {
    const newDocRef = doc(tagRef); // 자동 ID
    batch.set(newDocRef, { label });
  });

  await batch.commit();
}

export async function deleteAllTags(userId: string) {
  const snapshot = await getDocs(getTagCollectionRef(userId));
  const batch = writeBatch(db);

  snapshot.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
}

export async function addAllTags(userId: string, tags: string[]) {
  const batch = writeBatch(db);
  const ref = getTagCollectionRef(userId);

  tags.forEach((label) => {
    const docRef = doc(ref); // 자동 ID 생성
    batch.set(docRef, { label });
  });

  await batch.commit();
}

export async function replaceAllTags(userId: string, tags: string[]) {
  await deleteAllTags(userId);
  await addAllTags(userId, tags);
}
