import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import NovicEmblem from "../assets/Application_Image/NoviceFigma.png";
import NovicLogo from "../assets/Application_Image/NovicLogo.png";
import GoogleLogo from "../assets/Application_Image/Google.svg";
import FacebookLogo from "../assets/Application_Image/FacebookLogo.svg";
import "../styles/Signin.css";
import { Box, Alert, IconButton, Collapse } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const serverapiUrl = import.meta.env.VITE_API_URL;

const Signin = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState([]);

  const handleGoogleSignIn = () => {
    window.location.href = `${serverapiUrl}/auth/google`;
  };

  const handleFacebookLogin = () => {
    window.location.href = `${serverapiUrl}/auth/facebook`;
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
        setAlertMessage([true, "Registration  successful"]);
        setOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setAlertMessage([
          false,
          data.message || "Internal error wait for sometime",
        ]);
        setOpen(true);
      }
    } catch (err) {
      setAlertMessage([false, "Registration failed: " + err.message]);
      setOpen(true);
    }
  }

  return (
    <div className="SigninPage">
      <Box sx={{ width: "80vh", marginBottom: "1vh" }}>
        <Collapse in={open}>
          <Alert
            severity={alertMessage[0] ? "success" : "error"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false); // Closes the alert when close icon is clicked
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }} // Styling for spacing
          >
            {alertMessage[1]} {/* Displays alert message */}
          </Alert>
        </Collapse>
      </Box>
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

          <div onClick={handleFacebookLogin}>
            <img className="Options" src={FacebookLogo}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
