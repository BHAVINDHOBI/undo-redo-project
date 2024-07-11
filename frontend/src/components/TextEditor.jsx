import React, { useEffect, useState, useRef } from "react";
import "../styles/TextEditor.css";

const TextEditor = () => {
  const [inputValue, setInputValue] = useState("");
  const [history, setHistory] = useState([""]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const inputRef = useRef(null);

  const specialCharacters = [
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "-",
    "_",
    "=",
    "+",
    "{",
    "}",
    "[",
    "]",
    ":",
    ";",
    "'",
    '"',
    ",",
    "<",
    ".",
    ">",
    "?",
    "/",
    "\\",
    "|",
    "~",
    "`",
    " ",
  ];

  // Update history when input value changes
  useEffect(() => {
    if (history[historyIndex] !== inputValue) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(inputValue);
      setHistory(newHistory);
      setHistoryIndex(historyIndex + 1);
    }
  }, [inputValue]);

  const handleUndo = () => {
    if (historyIndex >= 0) {
      setHistoryIndex(historyIndex - 1);
      setInputValue(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex <= history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setInputValue(history[historyIndex + 1]);
    }
  };

  const handleChange = (event) => {
    const value = event.target.value;
    const lastChar = value[value.length - 1];
    const isSpecialChar = specialCharacters.includes(lastChar);

    if (isSpecialChar || value === "") {
      setInputValue(value);
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(value);
      setHistory(newHistory);
      setHistoryIndex(historyIndex + 1);
    } else {
      setInputValue(value);
      const lastEntry = history[history.length - 1];
      if (!specialCharacters.includes(lastEntry[lastEntry.length - 1])) {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory[newHistory - 1] = value;
        setHistory(newHistory);
      } else {
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(value);
        setHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }
    }
  };

  // Handle key events for undo and redo
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (inputRef.current && inputRef.current === document.activeElement) {
        if (event.ctrlKey && (event.key === "z" || event.key === "Z")) {
          event.preventDefault();
          handleUndo();
        } else if ((event.ctrlKey && event.key === "y") || event.key === "Y") {
          event.preventDefault();
          handleRedo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleUndo, handleRedo]);

  return (
    <div
      className="TextEditor"
      type="text"
      contentEditable
      value={inputValue}
      onChange={handleChange}
      ref={inputRef}
    ></div>
  );
};

export default TextEditor;
