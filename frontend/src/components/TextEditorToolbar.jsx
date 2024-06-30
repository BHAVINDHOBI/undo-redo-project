import React from "react";
import ToolBarImage from "../assets/Utility.js";
import "../styles/TextEditorToolbar.css";
import { FormControl, Select, MenuItem } from "@mui/material";

const TextEditorToolbar = () => {
  const [screenSize, setScreenSize] = React.useState("");
  const [font, setFont] = React.useState("");
  const [fontSize, setFontSize] = React.useState("");
  const [alignment, setAlignment] = React.useState("");
  const [lineSpacing, setLineSpacing] = React.useState("");

  const handleScreenChange = (event) => {
    setScreenSize(event.target.value);
  };

  const handleFont = (event) => {
    setFont(event.target.value);
  };

  const handleFontSize = (event) => {
    setFontSize(event.target.value);
  };

  const handleAlignment = (event) => {
    setAlignment(event.target.value);
  };

  const handleLineSpacing = (event) => {
    setLineSpacing(event.target.value);
  };

  return (
    <div className="Toolbar">
      <div className="undo-redo_style">
        <div className="undo-btn">
          <img src={ToolBarImage.Undo} alt="Undo" />
        </div>
        <div className="redo-btn">
          <img src={ToolBarImage.Redo} alt="Redo" />
        </div>
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

        <FormControl size="small">
          <Select
            onChange={handleFontSize}
            value={fontSize}
            displayEmpty
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                },
              },
            }}
          >
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={9}>9</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value="">12</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={22}>22</MenuItem>
            <MenuItem value={24}>24</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="bullets-btn">
        <img src={ToolBarImage.Bullets} alt="Bullets" />
        <img src={ToolBarImage.Arrow} alt="Arrow" />
      </div>

      <div className="bullets_numbers-btn">
        <img src={ToolBarImage.Bullet_Numbers} alt="Bullet_Numbers" />
        <img src={ToolBarImage.Arrow} alt="Arrow" />
      </div>

      <div className="lineSpacing-btn">
        <img src={ToolBarImage.Line_Spacing} alt="Line_Spacing" />
        <img src={ToolBarImage.Arrow} alt="Arrow" />
      </div>

      <FormControl size="small">
        <Select onChange={handleAlignment} value={alignment} displayEmpty>
          <MenuItem value="">
            <img src={ToolBarImage.AlignLeft} alt="AlignLeft" />
          </MenuItem>
          <MenuItem value={ToolBarImage.AlignCenter}>
            <img src={ToolBarImage.AlignCenter} alt="AlignCenter" />
          </MenuItem>
          <MenuItem value={ToolBarImage.AlignRight}>
            <img src={ToolBarImage.AlignRight} alt="AlignRight" />
          </MenuItem>
          <MenuItem value={ToolBarImage.JustifyText}>
            <img src={ToolBarImage.JustifyText} alt="JustifyText" />
          </MenuItem>
        </Select>
      </FormControl>

      <div className="table-btn">
        <img src={ToolBarImage.Table} alt="Table" />
      </div>

      <div className="find_replace-btn">
        <img src={ToolBarImage.Find_Replace} alt="Find_Replace" />
      </div>

      <div className="upload_btn">
        <img src={ToolBarImage.Upload} alt="Upload" />
      </div>

      <div className="print_btn">
        <img src={ToolBarImage.Print} alt="Print" />
      </div>

      <div className="download-btn">
        <span>Download</span>
        <img src={ToolBarImage.Download} alt="Download" />
      </div>
    </div>
  );
};

export default TextEditorToolbar;
