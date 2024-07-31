import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
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
  const [errorMessage, setErrorMessage] = useState("");

  const handleFindChange = (event) => {
    setFindText(event.target.value);
    setErrorMessage(""); // Clear error message when find text changes
  };

  const handleReplaceChange = (event) => {
    setReplaceText(event.target.value);
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

    return newMatches;
  };

  const handleFind = () => {
    if (findText.trim() === "") {
      alert("Please enter text to find.");
      return;
    }

    const content = getEditorContent();
    const newMatches = updateMatches(content);

    setMatches(newMatches);
    if (newMatches.length > 0) {
      setCurrentMatchIndex(0);
      setErrorMessage(""); // Clear error message if matches found
    } else {
      setCurrentMatchIndex(null);
      setErrorMessage("Text not found."); // Set error message if no matches found
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
    setMatches(updatedMatches);

    // Update the current match index but do not switch to the next match
    setCurrentMatchIndex((prevIndex) => {
      if (prevIndex >= updatedMatches.length) return updatedMatches.length - 1;
      return prevIndex;
    });
  };

  const handleReplaceAll = () => {
    if (findText.trim() === "") {
      alert("Please enter text to find.");
      return;
    }

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
        {errorMessage && (
          <Typography color="error" className="error-message">
            {errorMessage}
          </Typography>
        )}
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
