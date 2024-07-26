import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import "../styles/FindAReplace.css";

const FindAReplace = ({
  open,
  onClose,
  getEditorContent,
  setEditorContent,
}) => {
  const [findText, setFindText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [matches, setMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(null);

  const handleFindChange = (event) => {
    setFindText(event.target.value);
  };

  const handleReplaceChange = (event) => {
    setReplaceText(event.target.value);
  };

  const highlightText = (start, end) => {
    const range = document.createRange();
    const sel = window.getSelection();
    const editor = document.querySelector(".TextEditor");

    if (editor) {
      const textNodes = Array.from(editor.childNodes).filter(
        (node) => node.nodeType === Node.TEXT_NODE
      );

      let accumulatedLength = 0;
      for (let node of textNodes) {
        const nodeLength = node.nodeValue.length;

        if (
          start >= accumulatedLength &&
          start < accumulatedLength + nodeLength
        ) {
          const nodeStart = start - accumulatedLength;
          const nodeEnd = Math.min(end - accumulatedLength, nodeLength);

          range.setStart(node, nodeStart);
          range.setEnd(node, nodeEnd);
          sel.removeAllRanges();
          sel.addRange(range);
          break;
        }

        accumulatedLength += nodeLength;
      }
    }
  };

  const updateMatches = (content) => {
    const regex = new RegExp(findText, "gi");
    const newMatches = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      newMatches.push({
        start: match.index,
        end: match.index + match[0].length,
      });
    }

    console.log("Updated Matches:", newMatches); // Debugging statement
    return newMatches;
  };

  const handleFind = () => {
    const content = getEditorContent();
    const newMatches = updateMatches(content);

    setMatches(newMatches);
    if (newMatches.length > 0) {
      setCurrentMatchIndex(0);
      const { start, end } = newMatches[0];
      highlightText(start, end);
    } else {
      setCurrentMatchIndex(null);
    }
  };

  const handleReplaceSelected = () => {
    if (matches.length === 0 || currentMatchIndex === null) return;

    const { start, end } = matches[currentMatchIndex];
    let content = getEditorContent();
    const before = content.substring(0, start);
    const after = content.substring(end);
    const newContent = before + replaceText + after;
    setEditorContent(newContent);

    // Recalculate matches after replacement
    const updatedMatches = updateMatches(newContent);
    const nextIndex = Math.min(currentMatchIndex, updatedMatches.length - 1);

    setMatches(updatedMatches);
    setCurrentMatchIndex(nextIndex);
    if (updatedMatches.length > 0) {
      const { start: nextStart, end: nextEnd } = updatedMatches[nextIndex];
      highlightText(nextStart, nextEnd);
    } else {
      setCurrentMatchIndex(null);
    }
  };

  const handleReplaceAll = () => {
    let content = getEditorContent();
    const regex = new RegExp(findText, "gi");
    const newContent = content.replace(regex, replaceText);
    setEditorContent(newContent);

    // Recalculate matches after replacement
    const updatedMatches = updateMatches(newContent);

    setMatches(updatedMatches);
    setCurrentMatchIndex(null);
  };

  const handleFindNext = () => {
    if (matches.length === 0 || currentMatchIndex === null) return;

    const nextIndex = (currentMatchIndex + 1) % matches.length;
    setCurrentMatchIndex(nextIndex);
    const { start, end } = matches[nextIndex];
    highlightText(start, end);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Find and Replace</DialogTitle>
      <DialogContent>
        <TextField
          label="Find"
          fullWidth
          value={findText}
          onChange={handleFindChange}
          className="find-input"
        />
        <TextField
          label="Replace"
          fullWidth
          value={replaceText}
          onChange={handleReplaceChange}
          className="replace-input"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFind}>Find</Button>
        <Button onClick={handleFindNext} disabled={matches.length === 0}>
          Find Next
        </Button>
        <Button
          onClick={handleReplaceSelected}
          disabled={matches.length === 0 || currentMatchIndex === null}
        >
          Replace Selected
        </Button>
        <Button onClick={handleReplaceAll} disabled={matches.length === 0}>
          Replace All
        </Button>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FindAReplace;
