import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Signin from "./components/Signin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Signin />
    </>
  );
}

export default App;
