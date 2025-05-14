import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { useInitializeTagState } from "./hooks/useTag";

function App() {
  useInitializeTagState();

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
