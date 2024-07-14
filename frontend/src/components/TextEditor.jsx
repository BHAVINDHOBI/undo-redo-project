import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import "../styles/TextEditor.css";
import { addToHistory, undo, redo } from "../redux/actions";
import Emoji from "./Emoji";
import TextEditorToolbar from "./TextEditorToolbar";

const TextEditor = () => {
  const inputValue = useSelector((state) => state.inputValue);
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const handleInput = debounce((event) => {
    const value = editorRef.current.innerText;
    dispatch(addToHistory(value));
  }, 300);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (editorRef.current && editorRef.current === document.activeElement) {
        if (event.ctrlKey && event.key === "z") {
          event.preventDefault();
          dispatch(undo());
        } else if (event.ctrlKey && event.key === "y") {
          event.preventDefault();
          dispatch(redo());
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerText !== inputValue) {
      editorRef.current.innerText = inputValue;
    }
  }, [inputValue]);

  return (
    <div className="TextEditorContainer">
      <TextEditorToolbar editorRef={editorRef} />
      <div
        className="TextEditor"
        contentEditable
        ref={editorRef}
        onInput={handleInput}
        onPaste={handleInput}
        suppressContentEditableWarning={true}
      ></div>
    </div>
  );
};

export default TextEditor;
