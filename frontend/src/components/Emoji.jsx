import React, { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import { useDispatch } from "react-redux";
import { addToHistory } from "../redux/actions";
import ToolBarImage from "../assets/Utility";
import "../styles/Emoji.css";

function Emoji({ editorRef }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);
  const buttonRef = useRef(null);
  const selectionRef = useRef(null);
  const dispatch = useDispatch();

  const handleEmojiClick = (emojiData) => {
    insertTextAtCursor(emojiData.emoji);
  };

  const insertTextAtCursor = (text) => {
    const editor = editorRef.current;
    editor.focus();

    if (selectionRef.current) {
      const range = selectionRef.current;
      range.deleteContents();
      const textNode = document.createTextNode(text);
      range.insertNode(textNode);

      // Move the cursor to the end of the inserted text
      range.setStartAfter(textNode);
      range.setEndAfter(textNode);

      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }

    dispatch(addToHistory(editor.innerText));
  };

  const handleEmojiButtonClick = () => {
    setShowEmojiPicker(!showEmojiPicker);

    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      selectionRef.current = selection.getRangeAt(0);
    }

    setTimeout(() => {
      if (emojiPickerRef.current && buttonRef.current) {
        const pickerRect = emojiPickerRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();

        if (pickerRect.top < 0) {
          emojiPickerRef.current.style.top = `${buttonRect.bottom}px`;
          emojiPickerRef.current.style.right = `${buttonRect.left}px`;
        }
      }
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleEmojiButtonClick}
        className="emoji-button"
      >
        <img src={ToolBarImage.SmileFace} alt="" />
      </button>
      {showEmojiPicker && (
        <div ref={emojiPickerRef} className="emoji-picker">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </>
  );
}

export default Emoji;
