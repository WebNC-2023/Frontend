import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import ToastContainer from "./components/Notifications/ToastContainer";
import React from "react";
import { DataContext } from "./contexts/DataContext";
function App() {
  let firstUserName = JSON.parse(localStorage.getItem("userInfo"))?.firstName || "";
  let lastUserName =  JSON.parse(localStorage.getItem("userInfo"))?.lastName || "";
  const [showSmallMenu, setShowSmallMenu] = useState(false);
  const [showContent, setShowContent] = useState("Home");
  const [showScreen, setShowScreen] = useState("courses");
  const [fullName, setFullName] = useState(`${firstUserName} ${lastUserName}`);
  return (
    <DataContext.Provider
      value={{ showSmallMenu, setShowSmallMenu, showContent, setShowContent, showScreen, setShowScreen, fullName, setFullName }}
    >
      <Router>
        <ToastContainer />
        <Routes>
          <Route path="/*" element={<Navigate to="/landing-page" />} />

          <Route path="/landing-page" element={<LandingPage />} />

          <Route path="/home-page" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
