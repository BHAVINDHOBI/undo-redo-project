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

    const newValue = editor.innerHTML;
    const newSelection = saveSelection(editor);

    dispatch(addToHistory({ value: newValue, selection: newSelection }));
  };

  const saveSelection = (containerEl) => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    const range = selection.getRangeAt(0);
    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    const start = preSelectionRange.toString().length;

    return {
      start: start,
      end: start + range.toString().length,
    };
  };

  const restoreSelection = (containerEl, savedSel) => {
    const charIndex = { start: 0, end: 0 };
    const nodeStack = [containerEl];
    let node;
    let foundStart = false;
    let stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        const nextCharIndex = charIndex.end + node.length;
        if (
          !foundStart &&
          savedSel.start >= charIndex.start &&
          savedSel.start <= nextCharIndex
        ) {
          const range = document.createRange();
          range.setStart(node, savedSel.start - charIndex.start);
          if (savedSel.end <= nextCharIndex) {
            range.setEnd(node, savedSel.end - charIndex.start);
            stop = true;
          } else {
            charIndex.start = nextCharIndex;
            nodeStack.push(node);
          }
          foundStart = true;
        } else if (foundStart && savedSel.end <= nextCharIndex) {
          const range = window.getSelection().getRangeAt(0);
          range.setEnd(node, savedSel.end - charIndex.start);
          stop = true;
        }
        charIndex.end = nextCharIndex;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(window.getSelection().getRangeAt(0));
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
