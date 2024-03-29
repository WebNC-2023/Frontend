import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/Login";
import Register from "./pages/RegisterPage/Register";
import Error from "./pages/ErrorPage/Error";
import ReactToastContainer from "./components/Notifications/ReactToastContainer";
import React from "react";
import { DataContext } from "./contexts/DataContext";
import ProtectedLanding from "./components/ProtectedLanding/ProtectedLanding";
import ProtectedSign from "./components/ProtectedSign/ProtectedSign";
import ProtectedHome from "./components/ProtectedHome/ProtectedHome";
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import ProtectedResetPassword from "./components/ProtectedResetPassword/ProtectedResetPassword";
import VerifyEmail from "./pages/VerifyEmailPage/VerifyEmail";
import ProtectedVerifyEmail from "./components/ProtectedVerifyEmail/ProtectedVerifyEmail";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import AcceptInvitePage from "./pages/AcceptInvitePage/AcceptInvitePage";
import SSOSuccess from "./pages/SSOSuccess";
import ProtectedAcceptInvite from "./components/ProtectedAcceptInvite/ProtectedAcceptInvite";
import AttendByLink from "./pages/AttendByLink";
import ProtectedAttendByLink from "./components/ProtectedAttendByLink/ProtectedAttendByLink";
import ClassDetailsPage from "./pages/ClassDetailsPage/ClassDetailsPage";
import AssignmentDetailsPage from "./pages/AssignmentDetailsPage/AssignmentDetailsPage";
import ProtectedAssignmentDetails from "./components/ProtectedAssignmentDetails/ProtectedAssignmentDetails";
import ReviewDetailsPage from "./pages/ReviewDetailsPage/ReviewDetailsPage";
import ProtectedReviewDetails from "./components/ProtectedReviewDetails/ProtectedReviewDetails";
import AdminPage from "./pages/AdminPage/AdminPage";
import ProtectedAdmin from "./components/ProtectedAdmin/ProtectedAdmin";
function App() {
  const [showSmallMenu, setShowSmallMenu] = useState(false);
  const [showContent, setShowContent] = useState("Home");
  const [showSidebar, setShowSidebar] = useState(true);
  const [contentClassTab, setContentClassTab] = useState();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "Tiếng Việt"
  );
  return (
    <DataContext.Provider
      value={{
        showSmallMenu,
        setShowSmallMenu,
        showContent,
        setShowContent,
        showSidebar,
        setShowSidebar,
        contentClassTab,
        setContentClassTab,
        language,
        setLanguage,
      }}
    >
      <Router>
        <ReactToastContainer />
        <Routes>
          <Route element={<ProtectedLanding />}>
            <Route path="/" element={<LandingPage />} />
          </Route>

          <Route element={<ProtectedHome />}>
            <Route path="/home-page" element={<HomePage />} />
            <Route element={<EditProfilePage />} path="/edit-profile" />
            <Route element={<ChangePasswordPage />} path="/change-password" />
          </Route>

          <Route element={<ProtectedSign />}>
            <Route path="/login" element={<Login />} />
            <Route path="/sso-success/" element={<SSOSuccess />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route
            path="/reset-password/:code"
            element={
              <ProtectedResetPassword>
                <ResetPasswordPage />
              </ProtectedResetPassword>
            }
          />
          <Route
            path="/active-account/:code"
            element={
              <ProtectedVerifyEmail>
                <VerifyEmail />
              </ProtectedVerifyEmail>
            }
          />

          <Route
            path="/class-details/:classId"
            element={<ClassDetailsPage />}
          />

          <Route
            path="/assignment-details/:assignmentId"
            element={
              <ProtectedAssignmentDetails>
                <AssignmentDetailsPage />
              </ProtectedAssignmentDetails>
            }
          />

          <Route
            path="/review-details/:reviewId"
            element={
              <ProtectedReviewDetails>
                <ReviewDetailsPage />
              </ProtectedReviewDetails>
            }
          />

          <Route
            path="/accept-invite"
            element={
              <ProtectedAcceptInvite>
                <AcceptInvitePage />
              </ProtectedAcceptInvite>
            }
          />

          <Route element={<ProtectedAdmin />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route element={<ProtectedAttendByLink />}>
            <Route path="/classes/:classId/attend" element={<AttendByLink />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
