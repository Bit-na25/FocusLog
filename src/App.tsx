import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { useInitializeAppData } from "./hooks/useInitializeAppData";
import { useAuthUser } from "./hooks/useAuthUser";
import { useEffect } from "react";

function App() {
  const { userId } = useAuthUser();
  const initializeAppData = useInitializeAppData();

  useEffect(() => {
    initializeAppData(userId);
  }, [userId]);

  return (
    <div className="mx-auto w-full max-w-lg">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
