import React, { useState } from "react";
import "../styles/Drawer.css";
import ToolBar from "../assets/Utility";

const SidebarComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
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
      </div>
    </div>
  );
};

export default SidebarComponent;
