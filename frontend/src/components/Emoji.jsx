// import React, { useState, useRef } from "react";
// import EmojiPicker from "emoji-picker-react";
// import "./App.css";

// function Emoji() {
//   const [textareaValue, setTextareaValue] = useState("");
//   const textareaRef = useRef(null);

//   const handleEmojiClick = (emojiData) => {
//     insertTextAtCursor(emojiData.emoji);
//   };

//   const insertTextAtCursor = (text) => {
//     const textarea = textareaRef.current;
//     const startPos = textarea.selectionStart;
//     const endPos = textarea.selectionEnd;
//     const oldValue = textarea.value;

//     // Insert text at cursor position
//     const newValue =
//       oldValue.substring(0, startPos) + text + oldValue.substring(endPos);
//     setTextareaValue(newValue);

//     // Move cursor position after the inserted text
//     textarea.selectionStart = startPos + text.length;
//     textarea.selectionEnd = startPos + text.length;
//     textarea.focus();
//   };

//   return (
//     <div className="App">
//       <h1>Textarea with Emoji Insertion</h1>
//       <EmojiPicker onEmojiClick={handleEmojiClick} />
//       <textarea
//         className="editable-textarea"
//         ref={textareaRef}
//         value={textareaValue}
//         onChange={(e) => setTextareaValue(e.target.value)}
//       />
//     </div>
//   );
// }

// export default Emoji;

import React, { useState, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import "./App.css";

function Emoji() {
  const [textareaValue, setTextareaValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const textareaRef = useRef(null);

  const handleEmojiClick = (emojiData) => {
    insertTextAtCursor(emojiData.emoji);
  };

  const insertTextAtCursor = (text) => {
    const textarea = textareaRef.current;
    const startPos = textarea.selectionStart;
    const endPos = textarea.selectionEnd;
    const oldValue = textarea.value;

    // Insert text at cursor position
    const newValue =
      oldValue.substring(0, startPos) + text + oldValue.substring(endPos);
    setTextareaValue(newValue);

    // Move cursor position after the inserted text
    textarea.selectionStart = startPos + text.length;
    textarea.selectionEnd = startPos + text.length;
    textarea.focus();
  };

  return (
    <div className="App">
      <h1>Textarea with Emoji Insertion</h1>
      <button
        onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        className="emoji-button"
      >
        😊
      </button>
      {showEmojiPicker && <EmojiPicker onEmojiClick={handleEmojiClick} />}
      <textarea
        className="editable-textarea"
        ref={textareaRef}
        value={textareaValue}
        onChange={(e) => setTextareaValue(e.target.value)}
      />
    </div>
  );
}

export default Emoji;
