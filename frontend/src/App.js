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
import ProtectedLanding from "./components/ProtectedLanding/ProtectedLanding";
import ProtectedSign from "./components/ProtectedSign/ProtectedSign";
import ProtectedHome from "./components/ProtectedHome/ProtectedHome";
function App() {
  const [showSmallMenu, setShowSmallMenu] = useState(false);
  const [showContent, setShowContent] = useState("Home");
  const [showScreen, setShowScreen] = useState("courses");
  return (
    <DataContext.Provider
      value={{
        showSmallMenu,
        setShowSmallMenu,
        showContent,
        setShowContent,
        showScreen,
        setShowScreen,
      }}
    >
      <Router>
        <ToastContainer />
        <Routes>
          <Route element={<ProtectedLanding />}>
            <Route path="/" element={<LandingPage />} />
          </Route>
          <Route element={<ProtectedHome />}>
            <Route path="/home-page" element={<HomePage />} />
          </Route>
          <Route element={<ProtectedSign />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
