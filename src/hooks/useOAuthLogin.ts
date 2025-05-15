import { auth, initializeUserData, isFirstLogin } from "@/firebase";
import { categoryState, defaultCategories, defaultTags, tagState } from "@/recoil";
import { signInWithPopup, AuthProvider, User } from "firebase/auth";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";

export function useOAuthLogin() {
  const setTags = useSetRecoilState(tagState);
  const setCategories = useSetRecoilState(categoryState);
  const [loading, setLoading] = useState(false);

  const login = useCallback(async (provider: AuthProvider): Promise<User | null> => {
    setLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);

      const userId = result.user.uid;
      const isFirst = await isFirstLogin(userId);
      if (isFirst) {
        await initializeUserData(userId);
        setTags(defaultTags);
        setCategories(defaultCategories);
      }

      return result.user;
    } catch (err: any) {
      // if (err.code === "auth/account-exists-with-different-credential") {
      //   const email = err.customData?.email;
      //   let pendingCred: OAuthCredential | null = null;

      //   if (error && error instanceof FirebaseError) {
      //     if (provider instanceof GoogleAuthProvider) {
      //       pendingCred = GoogleAuthProvider.credentialFromError(error);
      //     } else if (provider instanceof GithubAuthProvider) {
      //       pendingCred = GithubAuthProvider.credentialFromError(error);
      //     } else if (provider instanceof FacebookAuthProvider) {
      //       pendingCred = FacebookAuthProvider.credentialFromError(error);
      //     }
      //   }

      //   if (email && pendingCred) {
      //     const methods = await fetchSignInMethodsForEmail(auth, email);
      //     console.log("📛 sign-in methods for", email, methods);

      //     if (methods.length === 0) {
      //       alert(
      //         "해당 이메일은 등록된 계정이지만 로그인 방법 정보가 없습니다.\n관리자에게 문의하거나 계정을 초기화해 주세요.",
      //       );
      //     } else {
      //       const existingProviderId = methods[0];

      //       let existingProvider: AuthProvider;
      //       switch (existingProviderId) {
      //         case "google.com":
      //           existingProvider = new GoogleAuthProvider();
      //           break;
      //         case "github.com":
      //           existingProvider = new GithubAuthProvider();
      //           break;
      //         default:
      //           throw new Error("지원되지 않는 로그인 제공자입니다.");
      //       }

      //       // 기존 provider로 로그인
      //       const linkedResult = await signInWithPopup(auth, existingProvider);

      //       // 새 credential 연결
      //       await linkWithCredential(linkedResult.user, pendingCred);
      //       return linkedResult.user;
      //     }
      //   }
      // }

      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { login, loading };
}
