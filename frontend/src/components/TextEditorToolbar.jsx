import React, { useState } from "react";
import ToolBarImage from "../assets/Utility.js";
import "../styles/TextEditorToolbar.css";
import { FormControl, Select, MenuItem } from "@mui/material";
import { undo, redo } from "../redux/actions.js";
import { useDispatch } from "react-redux";
import Emoji from "./Emoji.jsx";

const TextEditorToolbar = ({ editorRef, execCommand }) => {
  const [screenSize, setScreenSize] = useState("");
  const [font, setFont] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [alignment, setAlignment] = useState("");
  const [lineSpacing, setLineSpacing] = useState("");
  const [highlightApplied, setHighlightApplied] = useState(false);
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    useState("#F0F8FF");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [textColorApplied, setTextColorApplied] = useState(false);

  const dispatch = useDispatch();

  const handleScreenChange = (event) => {
    setScreenSize(event.target.value);
  };

  const handleFont = (event) => {
    setFont(event.target.value);
    execCommand("fontName", event.target.value);
  };

  const handleFontSize = (event) => {
    setFontSize(event.target.value);
    execCommand("fontSize", event.target.value);
  };

  const handleAlignment = (event) => {
    setAlignment(event.target.value);
    execCommand(event.target.value);
  };

  const toggleHighlight = () => {
    if (highlightApplied) {
      execCommand("hiliteColor", "transparent"); // Removing the highlight
    } else {
      execCommand("hiliteColor", currentBackgroundColor); // Applying the highlight
    }
    setHighlightApplied(!highlightApplied); // Toggling the state
  };

  const toggleTextColor = () => {
    if (textColorApplied) {
      execCommand("foreColor", "#000000");
    } else {
      execCommand("foreColor", currentColor);
    }
    setTextColorApplied(!textColorApplied);
  };

  return (
    <div className="Toolbar">
      <div className="undo-redo_style">
        <div className="undo-btn" onClick={() => dispatch(undo())}>
          <img src={ToolBarImage.Undo} alt="Undo" />
        </div>
        <div className="redo-btn" onClick={() => dispatch(redo())}>
          <img src={ToolBarImage.Redo} alt="Redo" />
        </div>
      </div>
      <div className="bold-btn" onClick={() => execCommand("bold")}>
        <img src={ToolBarImage.Bold} alt="Bold" />
      </div>
      <div className="italic-btn" onClick={() => execCommand("italic")}>
        <img src={ToolBarImage.Italic} alt="Italic" />
      </div>
      <div className="underline-btn" onClick={() => execCommand("underline")}>
        <img src={ToolBarImage.Underline} alt="Underline" />
      </div>
      <div className="strike-btn" onClick={() => execCommand("strikeThrough")}>
        <img src={ToolBarImage.StrikeThrough} alt="StrikeThrough" />
      </div>
      <div className="highlight-btn">
        <img
          src={ToolBarImage.Highlight}
          alt="Highlighter"
          onClick={toggleHighlight}
        />
        <input
          type="color"
          onChange={(e) => setCurrentBackgroundColor(e.target.value)}
          value={currentBackgroundColor}
          style={{ width: "20px", height: "22px", border: "none" }}
        />
      </div>
      <div className="textcolor-btn">
        <img
          src={ToolBarImage.TextColor}
          alt="Text color"
          onClick={toggleTextColor}
        />
        <input
          type="color"
          onChange={(e) => setCurrentColor(e.target.value)}
          value={currentColor}
          style={{ width: "20px", height: "22px", border: "none" }}
        />
      </div>
      <FormControl size="small">
        <Select
          onChange={handleScreenChange}
          value={screenSize}
          displayEmpty
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 200,
              },
            },
          }}
        >
          <MenuItem value="">100%</MenuItem>
          <MenuItem value="200%">200%</MenuItem>
          <MenuItem value="300%">300%</MenuItem>
        </Select>
      </FormControl>

      <div className="font_style">
        <FormControl size="small">
          <Select
            onChange={handleFont}
            value={font}
            displayEmpty
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value="">Arial</MenuItem>
            <MenuItem value="Times New Roman">Times New Roman</MenuItem>
            <MenuItem value="Calibri">Calibri</MenuItem>
          </Select>
        </FormControl>

        <select onChange={handleFontSize} defaultValue="">
          <option value="" disabled>
            Font Size
          </option>
          <option value="1">8</option>
          <option value="2">10</option>
          <option value="3">12</option>
          <option value="4">14</option>
          <option value="5">18</option>
          <option value="6">24</option>
          <option value="7">36</option>
        </select>
        <select defaultValue="">
          <option value="" disabled>
            Custom Font Size
          </option>
          <option value="1em">1</option>
          <option value="1.5em">1.5</option>
          <option value="1.9em">1.9</option>
        </select>
      </div>

      <div
        className="bullets-btn"
        onClick={() => execCommand("insertUnorderedList")}
      >
        <img src={ToolBarImage.Bullets} alt="Bullets" />
        <img src={ToolBarImage.Arrow} alt="Arrow" />
      </div>

      <div
        className="bullets_numbers-btn"
        onClick={() => execCommand("insertOrderedList")}
      >
        <img src={ToolBarImage.Bullet_Numbers} alt="Bullet_Numbers" />
        <img src={ToolBarImage.Arrow} alt="Arrow" />
      </div>

      <div
        className="lineSpacing-btn"
        onClick={() => execCommand("justifyFull")}
      >
        <img src={ToolBarImage.Line_Spacing} alt="Line_Spacing" />
        <img src={ToolBarImage.Arrow} alt="Arrow" />
      </div>

      <FormControl size="small">
        <Select onChange={handleAlignment} value={alignment} displayEmpty>
          <MenuItem value="">
            <img src={ToolBarImage.AlignLeft} alt="AlignLeft" />
          </MenuItem>
          <MenuItem value="justifyCenter">
            <img src={ToolBarImage.AlignCenter} alt="AlignCenter" />
          </MenuItem>
          <MenuItem value="justifyRight">
            <img src={ToolBarImage.AlignRight} alt="AlignRight" />
          </MenuItem>
          <MenuItem value="justifyFull">
            <img src={ToolBarImage.JustifyText} alt="JustifyText" />
          </MenuItem>
        </Select>
      </FormControl>

      <div className="emoji-btn">
        <Emoji editorRef={editorRef} />
      </div>

      <div
        className="tableInsert-btn"
        onClick={() => execCommand("insertTable")}
      >
        <img src={ToolBarImage.Table} alt="InsertTable" />
        <img src={ToolBarImage.Arrow} alt="Arrow" />
      </div>

      <div className="findReplace-btn" onClick={() => execCommand("find")}>
        <img src={ToolBarImage.Find_Replace} alt="Find" />
      </div>

      <div className="print-btn" onClick={() => window.print()}>
        <img src={ToolBarImage.Print} alt="Print" />
      </div>

      <div className="download-btn">
        Download
        <img src={ToolBarImage.Download} alt="Document_Download" />
      </div>
    </div>
  );
};

export default TextEditorToolbar;
