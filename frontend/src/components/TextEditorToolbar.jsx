import React, { useState } from "react";
import ToolBarImage from "../assets/Utility";
import "../styles/TextEditorToolbar.css";
import { FormControl, Select, MenuItem } from "@mui/material";
import { undo, redo } from "../redux/actions";
import { useDispatch } from "react-redux";
import Emoji from "./Emoji";
import Upload from "./Upload";
import TableEditor from "./TableEditor";
import FindAReplace from "./FindAReplace";
import axios from "axios";

const TextEditorToolbar = ({
  editorRef,
  execCommand,
  setFileContent,
  getEditorContent,
  setEditorContent,
}) => {
  const [screenSize, setScreenSize] = useState("");
  const [font, setFont] = useState("");
  const [fontSize, setFontSize] = useState("");
  const [alignment, setAlignment] = useState("");
  const [showFindReplace, setShowFindReplace] = useState(false);

  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const tableEditorRef = React.useRef(null);

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

  const handleUpload = () => {
    fileInputRef.current.click();
  };

  const handleTableEditorOpen = () => {
    if (tableEditorRef.current) {
      tableEditorRef.current.insertTable();
    }
  };

  const openFindReplaceDialog = () => {
    setShowFindReplace(true);
  };

  const closeFindReplaceDialog = () => {
    setShowFindReplace(false);
  };

  const handleDownload = async (format) => {
    const content = editorRef.current.innerHTML;
    if (format === "txt") {
      const element = document.createElement("a");
      const textContent = editorRef.current.innerText;
      const file = new Blob([textContent], { type: "text/plain" });
      element.href = URL.createObjectURL(file);

      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      element.download = `content-${formattedDate}.txt`;

      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }

    if (format === "pdf") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/generatepdf",
          { content },
          {
            responseType: "arraybuffer",
          }
        );
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const url = URL.createObjectURL(pdfBlob);
        const link = document.createElement("a");
        link.href = url;

        const date = new Date();
        const formattedDate = date.toISOString().split("T")[0];
        link.download = `content-${formattedDate}.pdf`;

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error("Error generating PDF:", error);
      }
    }
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
      <div className="tableInsert-btn" onClick={handleTableEditorOpen}>
        <img src={ToolBarImage.Table} alt="Table" />
      </div>
      <TableEditor ref={tableEditorRef} editorRef={editorRef} />

      <div className="hyperlink-btn">
        <img src={ToolBarImage.Link} alt="hyperlink" />
      </div>
      <div className="findReplace-btn" onClick={openFindReplaceDialog}>
        <img src={ToolBarImage.Find_Replace} alt="Find" />
      </div>
      {showFindReplace && (
        <FindAReplace
          open={showFindReplace}
          onClose={closeFindReplaceDialog}
          getEditorContent={getEditorContent}
          setEditorContent={setEditorContent}
        />
      )}
      <div className="print-btn" onClick={() => window.print()}>
        <img src={ToolBarImage.Print} alt="Print" />
      </div>
      <div className="upload-btn" onClick={() => fileInputRef.current.click()}>
        <img src={ToolBarImage.Upload} alt="Upload" />
        <Upload fileInputRef={fileInputRef} setFileContent={setFileContent} />
      </div>
      <div className="download-btn" onClick={() => handleDownload("pdf")}>
        Download
        <img src={ToolBarImage.Download} alt="Document_Download" />
      </div>
    </div>
  );
};

export default TextEditorToolbar;
