import React, { useState } from "react";
import "../styles/Drawer.css";
import ToolBar from "../assets/Utility";

const Drawer = ({ isOpen, onClose }) => {
  return (
    <div className={`drawer ${isOpen ? "open" : ""}`}>
      <div className="drawer-header">
        <img src={ToolBar.UserFiles}></img>
        <span className="Files">Files</span>
        <img src={ToolBar.Cross} alt="Close Icon" onClick={onClose} />
      </div>
    </div>
  );
};

const ToggleButton = ({ onClick }) => (
  <button className="toggle-button" onClick={onClick}>
    <img src={ToolBar.UserFiles} alt="Files Icon" width="20" height="20" />
    <span>Files</span>
  </button>
);

export { Drawer, ToggleButton };
