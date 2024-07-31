import React, { useState, useEffect } from "react";
import "../styles/Drawer.css";
import ToolBar from "../assets/Utility";
import UserFiles from "./UserFiles";

const SidebarComponent = ({ onToggleDrawer }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    const newDrawerState = !isDrawerOpen;
    setIsDrawerOpen(newDrawerState);
    onToggleDrawer(newDrawerState);
  };

  return (
    <div className="SideBarComponent">
      <button className="toggle-button" onClick={toggleDrawer}>
        <img src={ToolBar.UserFiles} alt="Files Icon" width="20" height="20" />
        <span>Files</span>
      </button>
      <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
        <div className="drawer-header">
          <img src={ToolBar.UserFiles} alt="Files Icon" />
          <span className="Files">Files</span>
          <img src={ToolBar.Cross} alt="Close Icon" onClick={toggleDrawer} />
        </div>
        <div>
          <UserFiles />
        </div>
      </div>
    </div>
  );
};

export default SidebarComponent;
