import React, { useState } from "react";
import { Drawer, ToggleButton } from "./Drawer";
import "../styles/Drawer.css";
import ToolBar from "../assets/Utility";

const DrawerTest = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <ToggleButton onClick={toggleDrawer} />
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
      <div className={`main-content ${isDrawerOpen ? "shifted" : ""}`}>
        <img src={ToolBar.UserFiles}></img>
        <span>Files</span>
      </div>
    </div>
  );
};

export default DrawerTest;
