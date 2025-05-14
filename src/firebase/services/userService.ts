import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";

const getUserDocRef = (userId: string) => doc(db, `users/${userId}`);

export async function getFocusDuration(userId: string): Promise<number | null> {
  const snapshot = await getDoc(getUserDocRef(userId));
  const data = snapshot.data();
  return data?.focusDuration ?? null;
}

export async function setFocusDuration(userId: string, value: number) {
  await updateDoc(getUserDocRef(userId), { focusDuration: value });
}
