import React from "react";
import ToolBarImage from "../assets/Utility";
import "../styles/AppBar.css";

const AppBar = () => {
  return (
    <nav className="AppContainer">
      <div className="Logo-Container">
        <img src={ToolBarImage.NoviceLogo} alt="NoviceLogo" />
        <img src={ToolBarImage.NoviceFigma} alt="NoviceText" />
      </div>
      <div className="AppBar-Utitilies">
        <div className="Profile">
          <img src={ToolBarImage.User} alt="User" />
          <div id="Username">Guest</div>
        </div>
        <div className="Notification-Logout">
          <img src={ToolBarImage.Notification} alt="Notification" />
          <img src={ToolBarImage.Logout} alt="Logout" />
        </div>
      </div>
    </nav>
  );
};
export default AppBar;
