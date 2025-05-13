// src/firebase/services/tagService.ts
import { db } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const addTag = async (uid: string, tag: string) => {
  const tagsRef = collection(db, "users", uid, "tags");
  await addDoc(tagsRef, {
    label: tag,
    createdAt: new Date().toISOString(),
  });
};

export const getTags = async (uid: string) => {
  const tagsRef = collection(db, "users", uid, "tags");
  const snapshot = await getDocs(tagsRef);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
