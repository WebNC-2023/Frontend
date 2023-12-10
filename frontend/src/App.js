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
import ForgotPasswordPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage/ResetPasswordPage";
import ProtectedResetPassword from "./components/ProtectedResetPassword/ProtectedResetPassword";
import VerifyEmail from "./pages/VerifyEmailPage/VerifyEmail";
import ProtectedVerifyEmail from "./components/ProtectedVerifyEmail/ProtectedVerifyEmail";
import ClassDetailsPage from "./pages/ClassDetailsPage/ClassDetailsPage";
import ProtectedClassDetails from "./components/ProtectedClassDetails/ProtectedClassDetails";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";
import ProtectedChangePassword from "./components/ProtectedChangePassword/ProtectedChangePassword";
import ProtectedEditProfile from "./components/ProtectedEditProfile/ProtectedEditProfile";
import EditProfilePage from "./pages/EditProfilePage/EditProfilePage";
import ProtectedClassroomExercises from "./components/ProtectedClassroomExercises/ProtectedClassroomExercises";
import ClassroomExercisesPage from "./pages/ClassroomExercisesPage/ClassroomExercisesPage";
import ProtectedClassroomEveryone from "./components/ProtectedClassroomEveryone/ProtectedClassroomEveryone";
import ClassroomEveryonePage from "./pages/ClassroomEveryonePage/ClassroomEveryonePage";
import AcceptInvitePage from "./pages/AcceptInvitePage/AcceptInvitePage";
import SSOSuccess from "./pages/SSOSuccess";
function App() {
  const [showSmallMenu, setShowSmallMenu] = useState(false);
  const [showContent, setShowContent] = useState("Home");
  const [showSidebar, setShowSidebar] = useState(true);
  const [contentClassTab, setContentClassTab] = useState();
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

          <Route element={<ProtectedChangePassword />}>
            <Route element={<ChangePasswordPage />} path="/change-password" />
          </Route>

          <Route element={<ProtectedEditProfile />}>
            <Route element={<EditProfilePage />} path="/edit-profile" />
          </Route>

          <Route element={<ProtectedSign />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route element={<ProtectedSign />}>
            <Route path="/sso-success/" element={<SSOSuccess />} />
          </Route>

          <Route element={<ProtectedSign />}>
            <Route path="/register" element={<Register />} />
          </Route>

          <Route element={<ProtectedSign />}>
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
          <Route element={<ProtectedClassDetails />}>
            <Route
              path="/class-details/:classId"
              element={<ClassDetailsPage />}
            />
          </Route>

          <Route element={<ProtectedClassroomExercises />}>
            <Route
              path="/class-details/:classId/exercises"
              element={<ClassroomExercisesPage />}
            />
          </Route>

          <Route element={<ProtectedClassroomEveryone />}>
            <Route
              path="/class-details/:classId/everyone"
              element={<ClassroomEveryonePage />}
            />
          </Route>

          <Route
            path="/accept-invite/:classId"
            element={<AcceptInvitePage />}
          />

          <Route path="*" element={<Error />} />
        </Routes>
      </Router>
    </DataContext.Provider>
  );
}

export default App;
