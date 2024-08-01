import React, { useState } from "react";
import "../styles/NameBar.css";
import SidebarComponent from "./Drawer";
import ToolBarImage from "../assets/Utility";
import { Tooltip } from "@mui/material";

const NameBar = ({ toggleTheme, onDrawerToggle }) => {
  const handleToggleDrawer = (isDrawerOpen) => {
    onDrawerToggle(isDrawerOpen);
  };

  return (
    <div className="NameBar">
      <SidebarComponent onToggleDrawer={handleToggleDrawer} />
      <span className="Text_Editor">Text Editor</span>
      <Tooltip title="Theme">
        <img
          className="Theme-Image"
          src={ToolBarImage.Theme}
          onClick={toggleTheme}
          alt="Toggle Theme"
        />
      </Tooltip>
    </div>
  );
};

export default NameBar;
