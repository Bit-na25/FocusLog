import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import { useInitializeTagState } from "./hooks/useTag";
import { useInitializeCategoryState } from "./hooks/useCategory";

function App() {
  useInitializeTagState();
  useInitializeCategoryState();

  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
