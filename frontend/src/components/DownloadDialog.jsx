import React from "react";
import { Dialog, DialogTitle, DialogContent, Button } from "@mui/material";
import "../styles/FindAReplace.css";
import axios from "axios";

const serverapiUrl = import.meta.env.VITE_API_URL;

export default function DownloadDialog({
  editorRef,
  open,
  onClose,
  getEditorContent,
}) {
  const handleDownloadTxt = () => {
    const textContent = editorRef.current.innerText;
    const element = document.createElement("a");
    const file = new Blob([textContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);

    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    element.download = `content-${formattedDate}.txt`;

    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    onClose();
  };

  const handleDownloadPdf = async () => {
    const content = getEditorContent();
    try {
      const response = await axios.post(
        `${serverapiUrl}/api/generatepdf`,
        { content },
        {
          responseType: "arraybuffer",
        }
      );
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(pdfBlob);
      const link = document.createElement("a");
      link.href = url;

      const date = new Date();
      const formattedDate = date.toISOString().split("T")[0];
      link.download = `content-${formattedDate}.pdf`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      onClose();
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Download File</DialogTitle>
      <DialogContent>
        <Button variant="contained" onClick={handleDownloadTxt}>
          Txt File
        </Button>
        <Button variant="contained" onClick={handleDownloadPdf}>
          Pdf File
        </Button>
      </DialogContent>
    </Dialog>
  );
}
