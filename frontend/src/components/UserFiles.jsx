import React from "react";
import ToolBarImage from "../assets/Utility";

const UserFiles = () => {
  return (
    <div>
      <div>
        <span>File-1</span>
        <img src={ToolBarImage.UserFiles}></img>
      </div>
      <div>
        <span>File-2</span>
        <img src={ToolBarImage.UserFiles}></img>
      </div>
      <div>
        <span>File-3</span>
        <img src={ToolBarImage.UserFiles}></img>
      </div>
      <div>
        <span>File-4</span>
        <img src={ToolBarImage.UserFiles}></img>
      </div>
      <div>
        <span>File-5</span>
        <img src={ToolBarImage.UserFiles}></img>
      </div>
    </div>
  );
};

export default UserFiles;
