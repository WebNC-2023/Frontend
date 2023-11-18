import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Error from "./pages/ErrorPage/Error";
import ToastContainer from "./components/Notifications/ToastContainer";
import React from "react";
import { DataContext } from "./contexts/DataContext";
function App() {
  let firstUserName =
    JSON.parse(localStorage.getItem("userInfo"))?.firstName || "";
  let lastUserName =
    JSON.parse(localStorage.getItem("userInfo"))?.lastName || "";
  const [showSmallMenu, setShowSmallMenu] = useState(false);
  const [showContent, setShowContent] = useState("Home");
  const [showScreen, setShowScreen] = useState("courses");
  const [fullName, setFullName] = useState(`${firstUserName} ${lastUserName}`);
  return (
    <DataContext.Provider
      value={{
        showSmallMenu,
        setShowSmallMenu,
        showContent,
        setShowContent,
        showScreen,
        setShowScreen,
        fullName,
        setFullName,
      }}
    >
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;