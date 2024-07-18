import React, { useState, useRef, useEffect } from "react";
import mammoth from "mammoth";
import "../styles/Upload.css";

const Upload = () => {
  const [fileContent, setFileContent] = useState("");
  const contentEditableRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      if (file.type === "text/plain") {
        reader.onload = (e) => {
          setFileContent(e.target.result);
        };
        reader.readAsText(file);
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        reader.onload = (e) => {
          mammoth
            .extractRawText({ arrayBuffer: e.target.result })
            .then((result) => {
              setFileContent(result.value);
            })
            .catch((error) => {
              console.error("Error reading .docx file:", error);
            });
        };
        reader.readAsArrayBuffer(file);
      } else {
        alert(
          "Unsupported file type. Please upload a .txt, .doc, or .docx file."
        );
      }
    }
  };

  const handleContentChange = () => {
    setFileContent(contentEditableRef.current.innerText);
  };

  useEffect(() => {
    if (
      contentEditableRef.current &&
      contentEditableRef.current.innerText !== fileContent
    ) {
      contentEditableRef.current.innerText = fileContent;
    }
  }, [fileContent]);

  return (
    <div className="file-upload-container">
      <h1>File Upload and Edit</h1>
      <input type="file" accept=".txt,.doc,.docx" onChange={handleFileUpload} />
      <div
        id="fileContent"
        className="file-content"
        contentEditable="true"
        onInput={handleContentChange}
        ref={contentEditableRef}
        suppressContentEditableWarning={true}
      ></div>
    </div>
  );
};

export default Upload;
