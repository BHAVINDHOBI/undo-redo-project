import React from "react";
import NovicEmblem from "../assets/NoviceFigma.png";
import NovicLogo from "../assets/NovicLogo.png";
import GoogleLogo from "../assets/Google.svg";
import GitHubLogo from "../assets/GitHub Logo.svg";
import MicrosoftLogo from "../assets/Microsoft Logo.svg";
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

        <button className="LoginButton">Login</button>

        <text className="LoginW">Login With:-</text>

        <div className="LoginOptions">
          <div>
            <img className="Options" src={GoogleLogo}></img>
          </div>
          <div>
            <img className="Options" src={GitHubLogo}></img>
          </div>
          <div>
            <img className="Options" src={MicrosoftLogo}></img>
          </div>
        </div>

        <div className="NewUser">
          New User ? <span className="RegisterURl">Register</span>{" "}
        </div>
      </div>
    </div>
  );
};

export default Login;
