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
import DrawerTest from "./components/drawertest";

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
          <Route path="/drawer" Component={DrawerTest} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
