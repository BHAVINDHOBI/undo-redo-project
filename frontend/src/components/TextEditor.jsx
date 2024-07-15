import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import "../styles/TextEditor.css";
import { addToHistory, undo, redo } from "../redux/actions";
import TextEditorToolbar from "./TextEditorToolbar";

const TextEditor = () => {
  const inputValue = useSelector((state) => state.inputValue);
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const saveSelection = (containerEl) => {
    let selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    let range = selection.getRangeAt(0);
    let preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    let start = preSelectionRange.toString().length;

    return {
      start: start,
      end: start + range.toString().length,
    };
  };

  const restoreSelection = (containerEl, savedSel) => {
    if (!savedSel) return;
    let charIndex = 0,
      range = document.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    let nodeStack = [containerEl],
      node,
      foundStart = false,
      stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        let nextCharIndex = charIndex + node.length;
        if (
          !foundStart &&
          savedSel.start >= charIndex &&
          savedSel.start <= nextCharIndex
        ) {
          range.setStart(node, savedSel.start - charIndex);
          foundStart = true;
        }
        if (
          foundStart &&
          savedSel.end >= charIndex &&
          savedSel.end <= nextCharIndex
        ) {
          range.setEnd(node, savedSel.end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  const handleInput = debounce((event) => {
    let value = editorRef.current.innerHTML;
    const selection = saveSelection(editorRef.current);
    dispatch(addToHistory({ value: value || "", selection }));
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
    if (editorRef.current && editorRef.current.innerHTML !== inputValue.value) {
      editorRef.current.innerHTML = inputValue.value || "";
      restoreSelection(editorRef.current, inputValue.selection);
    }
  }, [inputValue]);

  const execCommand = (command, value = null) => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      const parentNode = range.commonAncestorContainer.parentNode;
      document.execCommand(command, false, value);
    }
    editorRef.current.focus();
  };

  return (
    <div className="TextEditorContainer">
      <TextEditorToolbar editorRef={editorRef} execCommand={execCommand} />
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
