import { deleteApp, getApp, getApps } from "firebase/app";

export const resetFirebase = async () => {
  if (getApps().length > 0) {
    try {
      await deleteApp(getApp());
      console.log("🧹 Firebase 앱 삭제 완료");
    } catch (err) {
      console.error("🔥 Firebase 앱 삭제 실패", err);
    }
  }
  indexedDB.deleteDatabase("firebaseLocalStorageDb");
  console.log("🧹 IndexedDB 초기화 완료");
};
