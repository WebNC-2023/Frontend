import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UndoOutlinedIcon from "@mui/icons-material/UndoOutlined";
import axios from "axios";
import "./ForgotPasswordPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailErrorState, setEmailErrorState] = useState(false);
  const [emailErrorMsg, setEmailErrorMsg] = useState("");
  const [sending, setSending] = useState(false);
  const loginLockStyles = {
    backgroundColor: "#1bbd7e",
  };
  const loginUsernameStyles = {
    marginTop: "16px",
  };
  const loginSubmitBtn = {
    marginTop: "16px",
  };
  const handleSubmitSendEmailToResetPassword = () => {
    if (email === "") {
      setEmailErrorState(true);
      setEmailErrorMsg("Required");
    } else {
      if (emailErrorMsg === "") {
        async function sendEmailToResetPassword() {
          setSending(true);
          const res = await axios({
            url: "https://webnc-2023.vercel.app/auth/forgot-password",
            method: "POST",
            withCredentials: true,
            data: {
              email,
            },
          });
          return res;
        }
        sendEmailToResetPassword()
          .then((res) => {
            setSending(false);
            toast.success(`${res.data.message}`, {
              autoClose: 10000,
            });
            setTimeout(() => {
              navigate("/login");
            }, 11000);
          })
          .catch((err) => {
            setSending(false);
            toast.error(`${err.response.data.message}`);
          });
      }
    }
  };
  return (
    <Grid container justifyContent={"center"} direction={"row"}>
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        className="forgotPassword-container"
        style={{ marginTop: "20px" }}
      >
        <Paper elevation={10} className="forgotPassword-form">
          <Grid container alignItems={"center"} flexDirection={"column"}>
            <Avatar style={loginLockStyles}>
              <ErrorOutlineIcon />
            </Avatar>
            <h2 className="forgotPassword-title">Forgot Password</h2>
          </Grid>
          <TextField
            disabled={sending}
            error={emailErrorState}
            helperText={emailErrorMsg}
            style={loginUsernameStyles}
            label="Email"
            placeholder="Enter your email"
            variant="standard"
            autoComplete="none"
            required
            fullWidth
            spellCheck="false"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value !== "") {
                const gmailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                if (gmailRegex.test(e.target.value)) {
                  setEmailErrorState(false);
                  setEmailErrorMsg("");
                } else {
                  setEmailErrorState(true);
                  setEmailErrorMsg("Does not match");
                }
              } else {
                setEmailErrorState(true);
                setEmailErrorMsg("Required");
              }
            }}
          />
          <Button
            style={loginSubmitBtn}
            color="success"
            type="submit"
            variant="contained"
            fullWidth
            onClick={handleSubmitSendEmailToResetPassword}
            disabled={sending}
          >
            {sending ? "Sending..." : "Reset my password"}
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

export default ForgotPasswordPage;
