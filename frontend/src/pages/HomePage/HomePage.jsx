import "./HomePage.css";
import { useEffect, useState, useContext } from "react";
import { Grid, Avatar, Paper, TextField, Button, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SendIcon from "@mui/icons-material/Send";
import CloseIcon from "@mui/icons-material/Close";
import AlarmIcon from "@mui/icons-material/Alarm";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import axios from "axios";
import Courses from "../../components/Courses/Courses";
import { DataContext } from "../../contexts/DataContext";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import EditProfile from "../../components/EditProfile/EditProfile";
const HomePage = () => {
  const navigate = useNavigate();
  const [loadingHomePage, setLoadingHomPage] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentPasswordErrorState, setCurrentPasswordErrorState] = useState(false);
  const [currentPasswordErrorMsg, setCurrentPasswordErrorMsg] = useState("");
  const [newPasswordErrorState, setNewPasswordErrorState] = useState(false);
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState("");
  const [confirmNewPasswordErrorState, setConfirmNewPasswordErrorState] = useState(false);
  const [confirmNewPasswordErrorMsg, setConfirmNewPasswordErrorMsg] = useState("");
  const [showLoadingChangePasswordBtn, setShowLoadingChangePasswordBtn] = useState(false);
  const { showScreen, setShowScreen, setFullName } = useContext(DataContext);
  const [changePasswordSuccess, setChangePasswordSuccess] = useState(false);
  useEffect(() => {
    async function checkLoggedIn() {
      setLoadingHomPage(true);
      const res = await axios({
        url: "https://webnc-2023.vercel.app/auth/me",
        method: "GET",
        withCredentials: true,
      });
      return res;
    }
    checkLoggedIn()
      .then((res) => {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            id: res.data.data.id,
            email: res.data.data.email,
            refreshToken: res.data.data.refreshToken,
            avatar: res.data.data.avatar,
          })
        );
        setFullName(`${res.data.data.firstName} ${res.data.data.lastName}`);
        setLoadingHomPage(false);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthorized") {
          localStorage.removeItem("userInfo");
          navigate("/");
        }
      });
  }, [navigate, setFullName]);
  const handleClickSaveChangePassword = () => {
    if (currentPassword === "") {
      setCurrentPasswordErrorState(true);
      setCurrentPasswordErrorMsg("Required");
    }
    if (newPassword === "") {
      setNewPasswordErrorState(true);
      setNewPasswordErrorMsg("Required");
    }
    if (confirmNewPassword === "") {
      setConfirmNewPasswordErrorState(true);
      setConfirmNewPasswordErrorMsg("Required");
    }
    if (
      currentPassword !== "" &&
      newPassword !== "" &&
      confirmNewPassword !== "" &&
      !currentPasswordErrorState &&
      !newPasswordErrorState &&
      !confirmNewPasswordErrorState
    ) {
    }
  };
  const handleClickCancelEdit = () => {
    setShowScreen("courses");
  };
  useEffect(() => {
    setShowScreen("courses");
  }, [setShowScreen]);
  if (loadingHomePage)
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  else
    return (
      <div className="home-page-container">
        <HomePageHeader />
        {showScreen === "courses" ? (
          <Courses />
        ) : showScreen === "edit profile" ? (
          <EditProfile />
        ) : (
          <Grid container justifyContent={"center"} className="">
            <Grid
              item
              xs={12}
              sm={8}
              md={4}
              className="editProfile-container"
              style={{ marginTop: "20px" }}
            >
              {changePasswordSuccess && (
                <>
                  <Alert severity="success" className="change-edit-success">
                    Change Successful
                  </Alert>
                  <CloseIcon
                    className="close-change-edit-success"
                    onClick={() => setChangePasswordSuccess(false)}
                  />
                </>
              )}
              <Paper elevation={10} className="editProfile-form">
                <Grid container direction={"column"} alignItems={"center"}>
                  <Avatar style={{ backgroundColor: "#1bbd7e" }}>
                    <EnhancedEncryptionIcon />
                  </Avatar>
                  <h2 className="editProfile-title">Change password</h2>
                </Grid>
                <TextField
                  error={currentPasswordErrorState}
                  helperText={currentPasswordErrorMsg}
                  style={{ marginTop: "16px" }}
                  label="Current password"
                  variant="standard"
                  fullWidth
                  type="password"
                  placeholder="Enter current password"
                  spellCheck="false"
                  autoComplete="none"
                  required
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    if (e.target.value === "") {
                      setCurrentPasswordErrorMsg("Required");
                      setCurrentPasswordErrorState(true);
                    } else {
                      setCurrentPasswordErrorMsg("");
                      setCurrentPasswordErrorState(false);
                    }
                  }}
                />
                <TextField
                  error={newPasswordErrorState}
                  helperText={newPasswordErrorMsg}
                  style={{ marginTop: "16px" }}
                  label="New password"
                  variant="standard"
                  fullWidth
                  type="password"
                  placeholder="Enter new password"
                  spellCheck="false"
                  autoComplete="none"
                  required
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (e.target.value === "") {
                      setNewPasswordErrorMsg("Required");
                      setNewPasswordErrorState(true);
                    } else {
                      const regexPassword = /^.{8,20}$/;
                      if (regexPassword.test(e.target.value)) {
                        setNewPasswordErrorMsg("");
                        setNewPasswordErrorState(false);
                      } else {
                        setNewPasswordErrorMsg(
                          "Password must have a minimum of 8 characters and a maximum of 20 characters"
                        );
                        setNewPasswordErrorState(true);
                      }
                    }
                  }}
                />
                <TextField
                  error={confirmNewPasswordErrorState}
                  helperText={confirmNewPasswordErrorMsg}
                  style={{ marginTop: "16px" }}
                  label="Confirm new password"
                  variant="standard"
                  fullWidth
                  type="password"
                  placeholder="Enter confirm new password"
                  spellCheck="false"
                  autoComplete="none"
                  required
                  value={confirmNewPassword}
                  onChange={(e) => {
                    setConfirmNewPassword(e.target.value);
                    if (e.target.value === "") {
                      setConfirmNewPasswordErrorMsg("Required");
                      setConfirmNewPasswordErrorState(true);
                    } else {
                      if (e.target.value !== newPassword) {
                        setConfirmNewPasswordErrorMsg(
                          "Password confirmation does not match the new password"
                        );
                        setConfirmNewPasswordErrorState(true);
                      } else {
                        setConfirmNewPasswordErrorMsg("");
                        setConfirmNewPasswordErrorState(false);
                      }
                    }
                  }}
                />
                {!showLoadingChangePasswordBtn ? (
                  <>
                    <Button
                      style={{ margin: "16px 0" }}
                      type="submit"
                      endIcon={<SendIcon />}
                      variant="contained"
                      fullWidth
                      onClick={handleClickSaveChangePassword}
                    >
                      Save Changes
                    </Button>
                    <Button
                      color="success"
                      variant="contained"
                      fullWidth
                      onClick={handleClickCancelEdit}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      style={{ margin: "16px 0" }}
                      type="submit"
                      endIcon={<AlarmIcon />}
                      variant="outlined"
                      disabled
                      fullWidth
                    >
                      Loading...
                    </Button>
                    <Button
                      color="success"
                      variant="outlined"
                      disabled
                      fullWidth
                      onClick={handleClickCancelEdit}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </div>
    );
};

export default HomePage;
