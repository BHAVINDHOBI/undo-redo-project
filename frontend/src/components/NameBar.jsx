import React from "react";
import "../styles/NameBar.css";
import SidebarComponent from "./Drawer";
import ToolBarImage from "../assets/Utility";

const NameBar = ({ toggleTheme }) => {
  return (
    <div className="NameBar">
      <SidebarComponent />
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
