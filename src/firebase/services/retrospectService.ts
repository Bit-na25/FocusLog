import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import { RetrospectType } from "@/recoil";

const getRetrospectCollectionRef = (userId: string) =>
  collection(db, `users/${userId}/retrospects`);

export async function getRetrospects(userId: string): Promise<RetrospectType[]> {
  const snapshot = await getDocs(getRetrospectCollectionRef(userId));
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      ...(data as Omit<RetrospectType, "id">),
    };
  });
}

export async function addRetrospect(userId: string, retrospect: RetrospectType) {
  const { id, ...rest } = retrospect;
  const docRef = await addDoc(getRetrospectCollectionRef(userId), rest);

  return docRef.id;
}

export async function updateRetrospect(
  userId: string,
  retrospectId: string,
  retrospect: Omit<RetrospectType, "id">,
) {
  const ref = doc(getRetrospectCollectionRef(userId), retrospectId);
  await updateDoc(ref, retrospect);
}

export async function deleteRetrospect(userId: string, retrospectId: string) {
  const ref = doc(getRetrospectCollectionRef(userId), retrospectId);
  await deleteDoc(ref);
}
