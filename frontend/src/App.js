import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";

import ToastContainer from "./components/Notifications/ToastContainer";
import React from "react";
function App() {
  return (
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
  );
}

export default App;
