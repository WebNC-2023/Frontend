import Grid from "@mui/material/Grid";
import { InputAdornment, IconButton } from "@mui/material";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LockResetIcon from "@mui/icons-material/LockReset";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import axios from "axios";
import "../ForgotPasswordPage/ForgotPasswordPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./ResetPasswordPage.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { code } = useParams();
  const [sending, setSending] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPasswordErrorState, setNewPasswordErrorState] = useState(false);
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState("");
  const [confirmNewPasswordErrorState, setConfirmNewPasswordErrorState] =
    useState(false);
  const [confirmNewPasswordErrorMsg, setConfirmNewPasswordErrorMsg] =
    useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const loginLockStyles = {
    backgroundColor: "#1bbd7e",
  };
  const loginSubmitBtn = {
    marginTop: "16px",
  };
  const handleClickSubmitResetPasswordByEmail = () => {
    if (newPassword === "") {
      setNewPasswordErrorMsg("Required");
      setNewPasswordErrorState(true);
    }
    if (confirmNewPassword === "") {
      setConfirmNewPasswordErrorMsg("Required");
      setConfirmNewPasswordErrorState(true);
    }
    if (
      newPassword !== "" &&
      confirmNewPassword !== "" &&
      confirmNewPasswordErrorMsg === "" &&
      newPasswordErrorMsg === ""
    ) {
      async function sendResetPasswordByEmail() {
        setSending(true);
        const res = await axios({
          url: "https://webnc-2023.vercel.app/auth/reset-password",
          method: "POST",
          withCredentials: true,
          data: {
            resetPasswordCode: `${code}`,
            newPassword: newPassword,
          },
        });
        return res;
      }
      sendResetPasswordByEmail()
        .then((res) => {
          setSending(false);
          toast.success(`${res.data.message}`, {
            autoClose: false,
          });
        })
        .catch((err) => {
          setSending(false);
          toast.error(`${err.response.data.message}`);
          setTimeout(() => {
            navigate("/forgot-password");
          }, 5000);
        });
    }
  };
  return (
    <Grid container justifyContent={"center"} direction={"row"}>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        className="resetPassword-container"
        style={{ marginTop: "20px" }}
      >
        <Paper elevation={10} className="resetPassword-form">
          <Grid container alignItems={"center"} flexDirection={"column"}>
            <Avatar style={loginLockStyles}>
              <LockResetIcon />
            </Avatar>
            <h2 className="resetPassword-title">Reset Password</h2>
          </Grid>
          <TextField
            disabled={sending}
            error={newPasswordErrorState}
            helperText={newPasswordErrorMsg}
            style={{ marginTop: "16px" }}
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
            disabled={sending}
            error={confirmNewPasswordErrorState}
            helperText={confirmNewPasswordErrorMsg}
            style={{ marginTop: "16px" }}
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
          <Button
            style={loginSubmitBtn}
            color="success"
            type="submit"
            variant="contained"
            fullWidth
            disabled={sending}
            onClick={handleClickSubmitResetPasswordByEmail}
          >
            {sending ? "Processing..." : "Reset"}
          </Button>
          <Grid
            container
            marginTop={4}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <UndoOutlinedIcon />
            </Avatar>
            <span
              className="back-to-login-page"
              style={
                sending
                  ? { pointerEvents: "none", color: "gray" }
                  : { pointerEvents: "" }
              }
              onClick={(e) => navigate("/login")}
            >
              Back to login page
            </span>
          </Grid>
        </Paper>
      </Grid>
      <ToastContainer
        position="top-center"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={3000}
      />
    </Grid>
  );
};

export default ResetPasswordPage;
