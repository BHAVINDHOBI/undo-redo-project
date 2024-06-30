import React from "react";
import ToolBarImage from "../assets/Utility.js";
import "../styles/TextEditorToolbar.css";
import { FormControl, Select, MenuItem } from "@mui/material";

const TextEditorToolbar = () => {
  const [screenSize, setScreenSize] = React.useState("");

  const handleScreenChange = (event) => {
    setScreenSize(event.target.value);
  };

  return (
    <div className="Toolbar">
      <div className="undo-btn">
        <img src={ToolBarImage.Undo} alt="Undo" />
      </div>
      <div className="redo-btn">
        <img src={ToolBarImage.Redo} alt="Redo" />
      </div>
      <div className="bold-btn">
        <img src={ToolBarImage.Bold} alt="Bold" />
      </div>
      <div className="italic-btn">
        <img src={ToolBarImage.Italic} alt="Italic" />
      </div>
      <div className="underline-btn">
        <img src={ToolBarImage.Underline} alt="Underline" />
      </div>
      <div className="strike-btn">
        <img src={ToolBarImage.StrikeThrough} alt="StrikeThrough" />
      </div>
      <div className="highlight-btn">
        <img src={ToolBarImage.Highlight} alt="Highlighter" />
        <img src={ToolBarImage.Arrow} alt="Arrow" />
      </div>
      <div className="textcolor-btn">
        <img src={ToolBarImage.TextColor} alt="Text color" />
        <img src={ToolBarImage.Arrow} alt="Arrow" />
      </div>
      <FormControl>
        <Select onChange={handleScreenChange} value={screenSize} displayEmpty>
          <MenuItem value="">100%</MenuItem>
          <MenuItem value="200%">200%</MenuItem>
          <MenuItem value="300%">300%</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default TextEditorToolbar;
