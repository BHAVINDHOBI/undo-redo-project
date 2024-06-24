import React from "react";
import NovicEmblem from "../assets/NoviceFigma.png";
import NovicLogo from "../assets/NovicLogo.png";
import "../styles/Login.css";

const Login = () => {
  return (
    <div className="LoginContainer">
      <div className="LogoContainer">
        <img src={NovicLogo} alt="NovicLogo" className="Logo" />
        <img src={NovicEmblem} alt="Novic" className="emblem" />
      </div>
      <div className="input-fields">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          required
        />
      </div>
    </div>
  );
};

export default Login;
