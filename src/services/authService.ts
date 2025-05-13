import { signInWithPopup, signOut } from "firebase/auth";
import { resetFirebase } from "@/utils/resetFirebase";
import { auth, googleProvider } from "@/firebase/firebase";

// 로그인
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (e: any) {
    console.error("❌ Firebase 로그인 실패:", e.code, e.message);
    throw e;
  }
};

// 로그아웃
export const logout = async () => {
  try {
    if (!auth || !auth.currentUser) {
      console.warn("⚠️ 이미 로그아웃된 상태입니다.");
      return;
    }

    // Firebase 세션 종료
    await auth.signOut();

    console.log("✅ 로그아웃 완료");
  } catch (e: any) {
    console.warn("⚠️ signOut 실패, 무시함:", e);
  } finally {
    // Firebase 완전 초기화
    await resetFirebase();
  }
};
