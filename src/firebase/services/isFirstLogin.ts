import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase";

export async function isFirstLogin(userId: string): Promise<boolean> {
  const userRef = doc(db, "users", userId);
  const snapshot = await getDoc(userRef);
  return !snapshot.exists(); // 존재하지 않으면 → 최초 로그인
}
