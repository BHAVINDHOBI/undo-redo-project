import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Signin from "./components/Signin";
import TextEditorToolBar from "./components/TextEditorToolBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TextEditorToolBar />
    </>
  );
}

export default App;
