import { collection, addDoc, deleteDoc, updateDoc, doc, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { ScheduleType } from "@/recoil";

const getScheduleCollectionRef = (userId: string) => collection(db, `users/${userId}/schedules`);

export async function getSchedules(userId: string): Promise<ScheduleType[]> {
  const snapshot = await getDocs(getScheduleCollectionRef(userId));

  return snapshot.docs
    .map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        ...data,
      } as ScheduleType;
    })
    .filter((s): s is ScheduleType => s !== null);
}

export async function addSchedule(userId: string, schedule: ScheduleType) {
  const { id, ...rest } = schedule;
  const docRef = await addDoc(getScheduleCollectionRef(userId), rest);

  return docRef.id;
}

export async function updateSchedule(
  userId: string,
  scheduleId: string,
  schedule: Omit<ScheduleType, "id">,
) {
  const ref = doc(getScheduleCollectionRef(userId), scheduleId);
  await updateDoc(ref, schedule);
}

export async function deleteSchedule(userId: string, scheduleId: string) {
  const ref = doc(getScheduleCollectionRef(userId), scheduleId);
  await deleteDoc(ref);
}
