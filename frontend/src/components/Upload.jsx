import React from "react";
import mammoth from "mammoth";
import "../styles/Upload.css";

const Upload = ({ fileInputRef, setFileContent }) => {
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

  return (
    <input
      type="file"
      accept=".txt,.doc,.docx"
      onChange={handleFileUpload}
      ref={fileInputRef}
      style={{ display: "none" }}
    />
  );
};

export default Upload;
