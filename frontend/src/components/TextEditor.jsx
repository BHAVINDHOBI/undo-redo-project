import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { debounce } from "lodash";
import DOMPurify from "dompurify";
import "../styles/TextEditor.css";
import { addToHistory, undo, redo } from "../redux/actions";
import TextEditorToolbar from "./TextEditorToolbar";
import NameBar from "./NameBar";

const TextEditor = () => {
  const inputValue = useSelector((state) => state.inputValue);
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const [theme, setTheme] = useState("light");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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
        "ul",
        "ol",
        "li",
        "div",
        "p",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "blockquote",
        "a",
      ],
      ALLOWED_ATTR: [
        "style",
        "class",
        "id",
        "face",
        "size",
        "color",
        "align",
        "href",
      ],
    });
  };

  const handleInput = debounce((event) => {
    let value = editorRef.current.innerHTML;
    value = sanitizeContent(value);
    const selection = saveSelection();
    dispatch(addToHistory({ value: value || "", selection }));
  }, 300);

  const setFileContent = (content) => {
    const sanitizedContent = sanitizeContent(content);
    editorRef.current.innerHTML = sanitizedContent;
    const selection = saveSelection();
    dispatch(addToHistory({ value: sanitizedContent || "", selection }));
  };

  const getEditorContent = () => {
    return editorRef.current.innerHTML;
  };

  const setEditorContent = (content) => {
    const sanitizedContent = sanitizeContent(content);
    editorRef.current.innerHTML = sanitizedContent;
    handleInput();
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

  useEffect(() => {
    const handleCtrlClick = (event) => {
      if (event.ctrlKey && event.target.tagName === "A") {
        event.preventDefault();
        window.open(event.target.href, "_blank");
      }
    };

    const editorElement = editorRef.current;
    editorElement.addEventListener("click", handleCtrlClick);

    return () => {
      editorElement.removeEventListener("click", handleCtrlClick);
    };
  }, []);

  const execCommand = (command, value = null) => {
    const sel = window.getSelection();
    if (sel.rangeCount > 0) {
      document.execCommand(command, false, value);
    }
    editorRef.current.focus();
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData("text");
    document.execCommand("insertText", false, sanitizeContent(text));
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const handleDrawerToggle = (isOpen) => {
    setIsDrawerOpen(isOpen);
  };

  return (
    <div className={`TextEditorContainer ${theme}`}>
      <TextEditorToolbar
        editorRef={editorRef}
        execCommand={execCommand}
        setFileContent={setFileContent}
        getEditorContent={getEditorContent}
        setEditorContent={setEditorContent}
      />
      <NameBar toggleTheme={toggleTheme} onDrawerToggle={handleDrawerToggle} />
      <div
        className={`TextEditor ${isDrawerOpen ? "drawer-open" : ""}`}
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
