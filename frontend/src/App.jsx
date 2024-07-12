import { useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import MainPage from "./components/MainPage";
import Test from "./components/Test";
const App = () => {
  const TokenHandler = () => {
    const navigate = useNavigate();

    useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      if (token) {
        localStorage.setItem("token", token);
        navigate("/");
      }
    }, [navigate]);

    return null;
  };

  return (
    <>
      <Router>
        <TokenHandler />
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/signin" Component={Signin} />
          <Route path="/" Component={MainPage} />
          <Route path="/Test" Component={Test} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
