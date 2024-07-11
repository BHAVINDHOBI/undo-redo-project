import React from "react";
import TextEditorToolbar from "./TextEditorToolbar";
import AppBar from "./AppBar";
import SidebarComponent from "./Drawer";

const MainPage = () => {
  return (
    <>
      <AppBar />
      <TextEditorToolbar />
      <SidebarComponent />
    </>
  );
};

export default MainPage;
