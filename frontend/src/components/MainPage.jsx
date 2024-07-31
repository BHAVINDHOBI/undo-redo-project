import React, { useState, useEffect } from "react";
import TextEditorToolbar from "./TextEditorToolbar";
import AppBar from "./AppBar";
import TextEditorArea from "./TextEditorArea";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const serverapiUrl = import.meta.env.VITE_API_URL;

const MainPage = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    picture: "",
  });

  const navigate = useNavigate();

  const getDataFromToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(`${serverapiUrl}/auth/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData({
        userName: response.data.user.userName,
        email: response.data.user.email,
        picture: response.data.user.picture,
      });
    } catch (error) {
      console.error("Error fetching data", error);
      navigate("/login");
    }
  };

  useEffect(() => {
    getDataFromToken();
  }, []); // Dependency array is empty to run once when component mounts

  return (
    <>
      <AppBar userData={userData} />
      <TextEditorArea />
    </>
  );
};

export default MainPage;
