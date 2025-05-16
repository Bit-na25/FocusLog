import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { useInitializeAppData } from "./hooks/useInitializeAppData";

function App() {
  useInitializeAppData();

  return (
    <div className="mx-auto w-full max-w-lg">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
