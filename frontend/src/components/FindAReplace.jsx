import React, { useState, useEffect } from "react";
import "../styles/FindAReplace.css";

function FindAReplace() {
  const [text, setText] = useState(
    "This is a sample text for testing the find and replace functionality."
  );
  const [find, setFind] = useState("");
  const [replace, setReplace] = useState("");
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  const handleTextChange = (e) => setText(e.target.innerText);

  const handleFindChange = (e) => setFind(e.target.value);
  const handleReplaceChange = (e) => setReplace(e.target.value);

  const replaceOne = () => {
    const regex = new RegExp(find, "i");
    const resultText = text.replace(regex, replace);
    setText(resultText);
  };

  const replaceAll = () => {
    const regex = new RegExp(find, "gi");
    const resultText = text.replace(regex, replace);
    setText(resultText);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key === "f") {
        e.preventDefault();
        openDialog();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="FindAReplace">
      <div
        className="editor"
        contentEditable
        onInput={handleTextChange}
        dangerouslySetInnerHTML={{ __html: text }}
      />
      {showDialog && (
        <div className="dialog">
          <label>Find:</label>
          <input type="text" value={find} onChange={handleFindChange} />
          <label>Replace with:</label>
          <input type="text" value={replace} onChange={handleReplaceChange} />
          <button onClick={replaceOne}>Replace</button>
          <button onClick={replaceAll}>Replace All</button>
          <button onClick={closeDialog}>Close</button>
        </div>
      )}
    </div>
  );
}

export default FindAReplace;
