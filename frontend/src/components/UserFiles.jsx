import React from "react";
import ToolBarImage from "../assets/Utility";
import "../styles/UserFiles.css";

const UserFiles = () => {
  return (
    <div className="Files">
      <div className="File-Children">
        <span>File-1</span>
        <img src={ToolBarImage.UserFiles}></img>
      </div>
      <div className="File-Children">
        <span>File-2</span>
        <img src={ToolBarImage.UserFiles}></img>
      </div>
      <div className="File-Children">
        <span>File-3</span>
        <img src={ToolBarImage.UserFiles}></img>
      </div>
      <div className="File-Children">
        <span>File-4</span>
        <img src={ToolBarImage.UserFiles}></img>
      </div>
      <div className="File-Children">
        <span>File-5</span>
        <img src={ToolBarImage.UserFiles}></img>
      </div>
    </div>
  );
};

export default UserFiles;
