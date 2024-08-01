import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";

const Hyperlink = ({ open, onClose, onAddLink }) => {
  const [url, setUrl] = useState("");
  const [tooltip, setTooltip] = useState({
    visible: false,
    x: 0,
    y: 0,
    url: "",
  });

  const handleAddLink = () => {
    onAddLink(url);
    setUrl("");
  };

  const handleMouseOver = (e) => {
    if (e.target.tagName === "A") {
      const rect = e.target.getBoundingClientRect();
      setTooltip({
        visible: true,
        x: rect.left,
        y: rect.top + window.scrollY,
        url: e.target.href,
      });
    }
  };

  const handleMouseOut = () => {
    setTooltip({ visible: false, x: 0, y: 0, url: "" });
  };

  useEffect(() => {
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, []);

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Add Hyperlink</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="URL"
            type="url"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddLink} color="primary">
            Add Link
          </Button>
        </DialogActions>
      </Dialog>
      {tooltip.visible && (
        <Tooltip
          title={tooltip.url}
          open={tooltip.visible}
          placement="top"
          style={{ position: "absolute", left: tooltip.x, top: tooltip.y }}
        >
          <div />
        </Tooltip>
      )}
    </>
  );
};

export default Hyperlink;
