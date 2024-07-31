import React, { useState } from "react";
import "../styles/NameBar.css";
import SidebarComponent from "./Drawer";
import ToolBarImage from "../assets/Utility";

const NameBar = ({ toggleTheme, onDrawerToggle }) => {
  const handleToggleDrawer = (isDrawerOpen) => {
    onDrawerToggle(isDrawerOpen);
  };

  return (
    <div className="NameBar">
      <SidebarComponent onToggleDrawer={handleToggleDrawer} />
      <span className="Text_Editor">Text Editor</span>
      <img
        className="Theme-Image"
        src={ToolBarImage.Theme}
        onClick={toggleTheme}
        alt="Toggle Theme"
      />
    </div>
  );
};

export default NameBar;
