import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DOMPurify from "dompurify";
import "../styles/TextEditor.css";
import { addToHistory, undo, redo } from "../redux/actions";
import TextEditorToolbar from "./TextEditorToolbar";

const TextEditor = () => {
  const inputValue = useSelector((state) => state.inputValue);
  const dispatch = useDispatch();
  const editorRef = useRef(null);

  const saveSelection = () => {
    let selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    let range = selection.getRangeAt(0);
    let preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(editorRef.current);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    let start = preSelectionRange.toString().length;

    return {
      start: start,
      end: start + range.toString().length,
    };
  };

  const restoreSelection = (savedSel) => {
    if (!savedSel) return;
    let charIndex = 0,
      range = document.createRange();
    range.setStart(editorRef.current, 0);
    range.collapse(true);
    let nodeStack = [editorRef.current],
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

  const sanitizeContent = (content) => {
    return DOMPurify.sanitize(content, {
      ALLOWED_TAGS: [
        "b",
        "i",
        "u",
        "strike",
        "br",
        "#text",
        "span",
        "table",
        "tr",
        "td",
        "th",
        "font",
      ],
      ALLOWED_ATTR: ["style", "face", "size", "color"],
    });
  };

  const handleInput = () => {
    let value = editorRef.current.innerHTML;
    value = sanitizeContent(value);
    const selection = saveSelection();
    dispatch(addToHistory({ value: value || "", selection }));
  };

  const setFileContent = (content) => {
    const sanitizedContent = sanitizeContent(content);
    editorRef.current.innerHTML = sanitizedContent;
    const selection = saveSelection();
    dispatch(addToHistory({ value: sanitizedContent || "", selection }));
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (editorRef.current && editorRef.current === document.activeElement) {
        if (event.ctrlKey && event.key === "z") {
          event.preventDefault();
          dispatch(undo());
        } else if (event.ctrlKey && event.key === "y") {
          event.preventDefault();
          dispatch(redo());
        } else if (event.key === "Enter") {
          event.preventDefault();
          const sel = window.getSelection();
          if (sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            range.deleteContents();
            const br = document.createElement("br");
            range.insertNode(br);
            range.setStartAfter(br);
            sel.removeAllRanges();
            sel.addRange(range);
            handleInput();
          }
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
      const selection = saveSelection();
      editorRef.current.innerHTML = inputValue.value || "";
      restoreSelection(selection);
    }
  }, [inputValue]);

  const execCommand = (command, value = null) => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      document.execCommand(command, false, value);
    }
    editorRef.current.focus();
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData("text");
    document.execCommand("insertText", false, sanitizeContent(text));
  };

  return (
    <div className="TextEditorContainer">
      <TextEditorToolbar
        editorRef={editorRef}
        execCommand={execCommand}
        setFileContent={setFileContent}
      />
      <div
        className="TextEditor"
        contentEditable
        ref={editorRef}
        onInput={handleInput}
        onPaste={handlePaste}
        suppressContentEditableWarning={true}
      ></div>
    </div>
  );
};

export default TextEditor;
