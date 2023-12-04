import {
  Grid,
  Avatar,
  Paper,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AlarmIcon from "@mui/icons-material/Alarm";
import EnhancedEncryptionIcon from "@mui/icons-material/EnhancedEncryption";
import { useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
//import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Axios from "../../redux/APIs/Axios";
const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentPasswordErrorState, setCurrentPasswordErrorState] =
    useState(false);
  const [currentPasswordErrorMsg, setCurrentPasswordErrorMsg] = useState("");
  const [newPasswordErrorState, setNewPasswordErrorState] = useState(false);
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState("");
  const [confirmNewPasswordErrorState, setConfirmNewPasswordErrorState] =
    useState(false);
  const [confirmNewPasswordErrorMsg, setConfirmNewPasswordErrorMsg] =
    useState("");
  const [showLoadingChangePasswordBtn, setShowLoadingChangePasswordBtn] =
    useState(false);
  const { setShowScreen } = useContext(DataContext);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
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
      async function sendChangePassword() {
        setShowLoadingChangePasswordBtn(true);
        const res = await Axios({
          method: "PATCH",
          url: "/users/change-password",
          data: {
            currentPassword: currentPassword,
            newPassword: newPassword,
          },
        });
        return res;
      }
      sendChangePassword()
        .then((res) => {
          setShowLoadingChangePasswordBtn(false);
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
          setCurrentPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
          toast.success("Your password has been changed successfully.", {
            autoClose: 3000,
          });
        })
        .catch((err) => {
          setShowLoadingChangePasswordBtn(false);
          toast.error(`${err.response.data.message}`, {
            autoClose: 3000,
          });
        });
    }
  };
  const handleClickCancelEdit = () => {
    setShowScreen("courses");
  };
  return (
    <Grid container justifyContent={"center"} className="">
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        className="editProfile-container"
        style={{ marginTop: "20px" }}
      >
        <Paper elevation={10} className="editProfile-form">
          <Grid container direction={"column"} alignItems={"center"}>
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <EnhancedEncryptionIcon />
            </Avatar>
            <h2 className="editProfile-title">Change password</h2>
          </Grid>
          <TextField
            disabled={showLoadingChangePasswordBtn}
            error={currentPasswordErrorState}
            helperText={currentPasswordErrorMsg}
            style={
              showLoadingChangePasswordBtn
                ? { marginTop: "16px", pointerEvents: "none" }
                : { marginTop: "16px" }
            }
            label="Current password"
            variant="standard"
            fullWidth
            type={showCurrentPassword ? "text" : "password"}
            placeholder="Enter current password"
            spellCheck="false"
            autoComplete="none"
            required
            value={currentPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowCurrentPassword(!showCurrentPassword);
                    }}
                  >
                    {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              if (e.target.value === "") {
                setCurrentPasswordErrorMsg("Required");
                setCurrentPasswordErrorState(true);
              } else {
                const regexPassword = /^.{8,20}$/;
                if (regexPassword.test(e.target.value)) {
                  setCurrentPasswordErrorMsg("");
                  setCurrentPasswordErrorState(false);
                } else {
                  setCurrentPasswordErrorMsg(
                    "Password must have a minimum of 8 characters and a maximum of 20 characters"
                  );
                  setCurrentPasswordErrorState(true);
                }
              }
            }}
          />
          <TextField
            disabled={showLoadingChangePasswordBtn}
            error={newPasswordErrorState}
            helperText={newPasswordErrorMsg}
            style={
              showLoadingChangePasswordBtn
                ? { marginTop: "16px", pointerEvents: "none" }
                : { marginTop: "16px" }
            }
            label="New password"
            variant="standard"
            fullWidth
            type={showNewPassword ? "text" : "password"}
            placeholder="Enter new password"
            spellCheck="false"
            autoComplete="none"
            required
            value={newPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowNewPassword(!showNewPassword);
                    }}
                  >
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
                  if (e.target.value === confirmNewPassword && confirmNewPassword.length >= 8) {
                    setConfirmNewPasswordErrorMsg("");
                    setConfirmNewPasswordErrorState(false);
                  } else if (e.target.value !== confirmNewPassword && confirmNewPassword.length >= 8) {
                    setConfirmNewPasswordErrorMsg(
                      "Password confirmation does not match the new password"
                    );
                    setConfirmNewPasswordErrorState(true);
                  }
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
            disabled={showLoadingChangePasswordBtn}
            error={confirmNewPasswordErrorState}
            helperText={confirmNewPasswordErrorMsg}
            style={
              showLoadingChangePasswordBtn
                ? { marginTop: "16px", pointerEvents: "none" }
                : { marginTop: "16px" }
            }
            label="Confirm new password"
            variant="standard"
            fullWidth
            type={showConfirmNewPassword ? "text" : "password"}
            placeholder="Enter confirm new password"
            spellCheck="false"
            autoComplete="none"
            required
            value={confirmNewPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowConfirmNewPassword(!showConfirmNewPassword);
                    }}
                  >
                    {showConfirmNewPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
                In processing...
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
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={3000}
      />
    </Grid>
  );
};

export default ChangePassword;
