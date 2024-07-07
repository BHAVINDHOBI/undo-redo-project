import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NovicEmblem from "../assets/NoviceFigma.png";
import NovicLogo from "../assets/NovicLogo.png";
import GoogleLogo from "../assets/Google.svg";

import MicrosoftLogo from "../assets/Microsoft Logo.svg";
import "../styles/Signin.css";

const serverapiUrl = import.meta.env.VITE_API_URL;

const Signin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleSignIn = () => {
    window.location.href = `${serverapiUrl}/auth/google`;
  };

  async function userRegister(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${serverapiUrl}/auth/userRegistration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, email, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.user);
        alert("Registration  successful");
        navigate("/");
      } else {
        alert(data.message || "Unknown error");
      }
    } catch (err) {
      alert("Registration failed: " + err.message);
    }
  }

  return (
    <div className="SigninPage">
      <div className="SigninContainer">
        <div className="LogoContainer">
          <img src={NovicLogo} alt="NovicLogo" className="Logo" />
          <img src={NovicEmblem} alt="Novic" className="emblem" />
        </div>

        <form onSubmit={userRegister}>
          <div className="input-fields">
            <input
              type="text"
              name="Username"
              id="Username"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
            <input
              type="email"
              name="email"
              id="Email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="button">
            <input className="LoginButton" type="submit" value="Signin" />
          </div>
        </form>

        <div class="separator">
          <span class="separator-text">OR</span>
        </div>

        <div className="SigninOptions">
          <div onClick={handleGoogleSignIn}>
            <img className="Options" src={GoogleLogo}></img>
          </div>

          <div>
            <img className="Options" src={MicrosoftLogo}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
