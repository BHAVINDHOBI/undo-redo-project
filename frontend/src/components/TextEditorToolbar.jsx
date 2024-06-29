import React from "react";
import ToolBarImage from "../assets/Utility.js";
import "../styles/TextEditorToolbar.css";

const TextEditorToolbar = () => {
  return (
    <div className="Toolbar">
      <div className="undo-btn">
        <img src={ToolBarImage.Undo} alt="Undo" />
      </div>
    </div>
  );
};

export default TextEditorToolbar;
