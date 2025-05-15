import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

export function useAuthUser() {
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserId(user ? user.uid : null);
      setName(user ? user.displayName : null);
      setPhoto(user ? user.photoURL : null);
      console.log(user?.uid);
    });
    return () => unsubscribe();
  }, []);

  return { userId, name, photo };
}
