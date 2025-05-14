import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { useInitializeAppData } from "./hooks/useInitializeAppData";

function App() {
  useInitializeAppData();

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
