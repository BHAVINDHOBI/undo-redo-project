import React, { useState, useEffect } from "react";
import ToolBarImage from "../assets/Utility";
import "../styles/TextEditorToolbar.css";
import { FormControl, Select, MenuItem } from "@mui/material";
import { undo, redo } from "../redux/actions";
import { useDispatch } from "react-redux";
import Emoji from "./Emoji";
import Upload from "./Upload";
import TableEditor from "./TableEditor";
import FindAReplace from "./FindAReplace";
import WebFont from "webfontloader";
import DownloadDialog from "./DownloadDialog";

const fonts = [
  "Arial",
  "Courier New",
  "Georgia",
  "Times New Roman",
  "Trebuchet MS",
  "Verdana",
  "Roboto",
  "Open Sans",
  // Add more fonts if needed
];

const TextEditorToolbar = ({
  editorRef,
  execCommand,
  setFileContent,
  getEditorContent,
  setEditorContent,
}) => {
  const [font, setFont] = useState(fonts[0]);
  const [fontSize, setFontSize] = useState("");
  const [alignment, setAlignment] = useState("justifyLeft");
  const [showFindReplace, setShowFindReplace] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const [highlightApplied, setHighlightApplied] = useState(false);
  const [currentBackgroundColor, setCurrentBackgroundColor] =
    useState("#F0F8FF");
  const [currentColor, setCurrentColor] = useState("#000000");
  const [textColorApplied, setTextColorApplied] = useState(false);

  const dispatch = useDispatch();
  const fileInputRef = React.useRef(null);
  const tableEditorRef = React.useRef(null);

  const handleFont = (event) => {
    const selectedFont = event.target.value;
    setFont(selectedFont);
    WebFont.load({
      google: {
        families: [selectedFont],
      },
    });
    execCommand("fontName", selectedFont);
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

  const openDownload = () => {
    setShowDownload(true);
  };

  const closeDownload = () => {
    setShowDownload(false);
  };

  const handlePrint = () => {
    const printContent = editorRef.current.innerHTML;
    const width = 1000;
    const height = 700;

    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const newWindow = window.open(
      "",
      "_blank",
      `width=${width},height=${height},left=${left},top=${top}`
    );

    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(`
        <html>
          <head>
            <style>
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: #ffffff; /* Ensure background color is applied to the body */
              }
              @media print {
                body {
                  margin: 0;
                  padding: 20px !important; /* Add space around the content */
                  box-sizing: border-box; /* Ensure padding is included in the width/height */
                  background-color: #ffffff !important; /* Ensure background color is applied */
                }
                @page {
                  size: auto;
                  margin: 0 !important; /* Removes default margins */
                }
                header, footer, nav, .no-print {
                  display: none !important; /* Hides headers, footers, and other non-printable elements */
                }
                /* Apply background color styles to content */
                .print-content {
                  background-color: #ffffff !important; /* Ensure background color is applied */
                }
              }
            </style>
          </head>
          <body>
            <div class="print-content">
              ${printContent}
            </div>
            <script type="text/javascript">
              window.onload = function() {
                setTimeout(function() {
                  window.print();
                  window.close();
                }, 500); // Adjust delay if necessary
              };
            </script>
          </body>
        </html>
      `);
      newWindow.document.close();
    } else {
      console.error("Failed to open a new window for printing.");
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
            {fonts.map((font) => (
              <MenuItem key={font} value={font}>
                {font}
              </MenuItem>
            ))}
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
          <MenuItem value="justifyLeft">
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
      <div className="print-btn" onClick={handlePrint}>
        <img src={ToolBarImage.Print} alt="Print" />
      </div>
      <div className="upload-btn" onClick={() => fileInputRef.current.click()}>
        <img src={ToolBarImage.Upload} alt="Upload" />
        <Upload fileInputRef={fileInputRef} setFileContent={setFileContent} />
      </div>
      <div className="download-btn" onClick={openDownload}>
        Download
        <img src={ToolBarImage.Download} alt="Document_Download" />
      </div>
      {showDownload && (
        <DownloadDialog
          editorRef={editorRef}
          open={showDownload}
          onClose={closeDownload}
          getEditorContent={getEditorContent}
        />
      )}
    </div>
  );
};

export default TextEditorToolbar;
