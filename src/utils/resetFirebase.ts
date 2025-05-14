import { deleteApp, getApp, getApps } from "firebase/app";

export const resetFirebase = async () => {
  if (getApps().length > 0) {
    try {
      await deleteApp(getApp());
    } catch (err) {
      console.error("🔥 Firebase 앱 삭제 실패", err);
    }
  }
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
};
