import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useSetRecoilState } from "recoil";
import { userAtom } from "./features/user/userAtom";
import { auth } from "./firebase/firebase";

function App() {
  const setUser = useSetRecoilState(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user ?? null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
