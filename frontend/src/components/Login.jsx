import React from "react";
import NovicEmblem from "../assets/NoviceFigma.png";
import NovicLogo from "../assets/NovicLogo.png";
import GoogleLogo from "../assets/Google.svg";

import MicrosoftLogo from "../assets/Microsoft Logo.svg";
import "../styles/Login.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

const serverapiUrl = import.meta.env.VITE_API_URL;

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = () => {
    window.location.href = `${serverapiUrl}/auth/google`;
  };

  async function userLogin(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${serverapiUrl}/auth/userLogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success && data.user) {
        localStorage.setItem("token", data.user);

        alert("Login successful");
        navigate("/");
      } else {
        alert(data.message || "Unknown error");
      }
    } catch (err) {
      alert("Login failed: " + err.message);
    }
  }

  return (
    <div className="LoginPage">
      <div className="LoginContainer">
        <div className="LogoContainer">
          <img src={NovicLogo} alt="NovicLogo" className="Logo" />
          <img src={NovicEmblem} alt="Novic" className="emblem" />
        </div>
        <form onSubmit={userLogin}>
          <div className="input-fields">
            <input
              type="text"
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
            <input className="LoginButton" type="submit" value="Login" />
          </div>
        </form>

        <div class="separator">
          <span class="separator-text">OR</span>
        </div>

        <div className="LoginOptions">
          <div onClick={handleGoogleLogin}>
            <img className="Options" src={GoogleLogo}></img>
          </div>

          <div>
            <img className="Options" src={MicrosoftLogo}></img>
          </div>
        </div>

        <div className="NewUser">
          New User ?{" "}
          <span className="RegisterURl">
            {" "}
            <Link to="/signin">Register</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
