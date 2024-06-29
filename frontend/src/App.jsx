import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signin from "./components/Signin";
import MainPage from "./components/MainPage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" Component={Login} />
          <Route path="/signin" Component={Signin} />
          <Route path="/" Component={MainPage} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
