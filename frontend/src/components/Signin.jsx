import React from "react";
import NovicEmblem from "../assets/NoviceFigma.png";
import NovicLogo from "../assets/NovicLogo.png";
import GoogleLogo from "../assets/Google.svg";

import MicrosoftLogo from "../assets/Microsoft Logo.svg";
import "../styles/Signin.css";

const Signin = () => {
  return (
    <div className="SigninContainer">
      <div className="LogoContainer">
        <img src={NovicLogo} alt="NovicLogo" className="Logo" />
        <img src={NovicEmblem} alt="Novic" className="emblem" />
      </div>

      <div className="input-fields">
        <input
          type="email"
          name="Username"
          id="Username"
          placeholder="Username"
          required
        />
        <input
          type="text"
          name="email"
          id="Email"
          placeholder="Email"
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
      <div className="button">
        <button className="SigninButton">Signin</button>
      </div>

      <div class="separator">
        <span class="separator-text">OR</span>
      </div>

      <div className="SigninOptions">
        <div>
          <img className="Options" src={GoogleLogo}></img>
        </div>

        <div>
          <img className="Options" src={MicrosoftLogo}></img>
        </div>
      </div>
    </div>
  );
};

export default Signin;
