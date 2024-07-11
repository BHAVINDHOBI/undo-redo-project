import React from "react";
import TextEditorToolbar from "./TextEditorToolbar";
import AppBar from "./AppBar";
import TextEditorArea from "./TextEditorArea";

const MainPage = () => {
  return (
    <>
      <AppBar />
      <TextEditorToolbar />
      <TextEditorArea />
    </>
  );
};

export default MainPage;
