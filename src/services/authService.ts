import { auth } from "@/firebase";
import { resetFirebase } from "@/utils/resetFirebase";

export const logout = async () => {
  try {
    if (!auth || !auth.currentUser) {
      console.warn("⚠️ 이미 로그아웃된 상태입니다.");
      return;
    }

    await auth.signOut();

    console.log("✅ 로그아웃 완료");
  } catch (e: any) {
    console.warn("⚠️ signOut 실패:", e);
  } finally {
    await resetFirebase();
  }
};
