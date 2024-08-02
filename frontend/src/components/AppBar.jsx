import React from "react";
import ToolBarImage from "../assets/Utility";
import "../styles/AppBar.css";
import { useNavigate } from "react-router-dom";

const AppBar = ({ userData }) => {
  const navigate = useNavigate();
  const Logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className="AppContainer">
      <div className="Logo-Container">
        <img src={ToolBarImage.NoviceLogo} alt="NoviceLogo" />
        <img src={ToolBarImage.NoviceFigma} alt="NoviceText" />
      </div>
      <div className="AppBar-Utitilies">
        <div className="Profile">
          <img src={userData.picture || ToolBarImage.User} alt="User" />
          <div id="Username">{userData.userName || "Guest"}</div>
        </div>
        <div className="Notification-Logout">
          <img src={ToolBarImage.Notification} alt="Notification" />
          <img src={ToolBarImage.Logout} onClick={Logout} alt="Logout" />
        </div>
      </div>
    </nav>
  );
};
export default AppBar;
