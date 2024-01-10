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
import { useContext, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import Axios from "../../redux/APIs/Axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
const ChangePassword = () => {
  const { language } = useContext(DataContext);
  const navigate = useNavigate();
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
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const handleClickSaveChangePassword = () => {
    if (currentPassword === "") {
      setCurrentPasswordErrorState(true);
      setCurrentPasswordErrorMsg(
        language === "English" ? "Required" : "Bắt buộc"
      );
    }
    if (newPassword === "") {
      setNewPasswordErrorState(true);
      setNewPasswordErrorMsg(language === "English" ? "Required" : "Bắt buộc");
    }
    if (confirmNewPassword === "") {
      setConfirmNewPasswordErrorState(true);
      setConfirmNewPasswordErrorMsg(
        language === "English" ? "Required" : "Bắt buộc"
      );
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
          toast.success(
            language === "English"
              ? "Your password has been changed successfully."
              : "Cập nhật mật khẩu thành công.",
            {
              autoClose: 3000,
            }
          );
        })
        .catch((err) => {
          setShowLoadingChangePasswordBtn(false);
          if (
            err?.response?.status === 401 &&
            err?.response?.data === "Unauthorized"
          ) {
            toast.error(`${err?.response?.data}`, {
              autoClose: 3000,
            });
            setTimeout(() => {
              navigate("/");
            }, 4000);
          } else {
            toast.error(`${err?.response?.data?.message}`, {
              autoClose: 3000,
            });
          }
        });
    }
  };
  const handleClickCancelEdit = () => {
    navigate("/home-page");
  };
  return (
    <Grid container justifyContent={"center"} className="">
      <Grid
        item
        xs={12}
        sm={8}
        md={4}
        className="editProfile-container"
        style={{ paddingTop: "105px" }}
      >
        <Paper elevation={10} className="editProfile-form">
          <Grid container direction={"column"} alignItems={"center"}>
            <Avatar style={{ backgroundColor: "#1bbd7e" }}>
              <EnhancedEncryptionIcon />
            </Avatar>
            <h2 className="editProfile-title">
              {language === "English" ? "Change password" : "Đổi mật khẩu"}
            </h2>
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
            label={
              language === "English" ? "Current password" : "Mật khẩu hiện tại"
            }
            variant="standard"
            fullWidth
            type={showCurrentPassword ? "text" : "password"}
            placeholder={
              language === "English"
                ? "Enter current password"
                : "Nhập mật khẩu hiện tại"
            }
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
                setCurrentPasswordErrorMsg(
                  language === "English" ? "Required" : "Bắt buộc"
                );
                setCurrentPasswordErrorState(true);
              } else {
                const regexPassword = /^.{8,20}$/;
                if (regexPassword.test(e.target.value)) {
                  setCurrentPasswordErrorMsg("");
                  setCurrentPasswordErrorState(false);
                } else {
                  setCurrentPasswordErrorMsg(
                    language === "English"
                      ? "Password must have 8-20 characters"
                      : "Mật khẩu phải có độ dài từ 8-20 ký tự"
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
            label={language === "English" ? "New password" : "Mật khẩu mới"}
            variant="standard"
            fullWidth
            type={showNewPassword ? "text" : "password"}
            placeholder={
              language === "English"
                ? "Enter new password"
                : "Nhập mật khẩu mới"
            }
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
                setNewPasswordErrorMsg(
                  language === "English" ? "Required" : "Bắt buộc"
                );
                setNewPasswordErrorState(true);
              } else {
                const regexPassword = /^.{8,20}$/;
                if (regexPassword.test(e.target.value)) {
                  setNewPasswordErrorMsg("");
                  setNewPasswordErrorState(false);
                  if (
                    e.target.value === confirmNewPassword &&
                    confirmNewPassword.length >= 8
                  ) {
                    setConfirmNewPasswordErrorMsg("");
                    setConfirmNewPasswordErrorState(false);
                  } else if (
                    e.target.value !== confirmNewPassword &&
                    confirmNewPassword.length >= 8
                  ) {
                    setConfirmNewPasswordErrorMsg(
                      language === "English"
                        ? "Password confirmation does not match the new password"
                        : "Mật khẩu xác nhận không khớp với mật khẩu mới"
                    );
                    setConfirmNewPasswordErrorState(true);
                  }
                } else {
                  setNewPasswordErrorMsg(
                    language === "English"
                      ? "Password must have 8-20 characters"
                      : "Mật khẩu phải có độ dài từ 8-20 ký tự"
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
            label={
              language === "English"
                ? "Confirm new password"
                : "Xác nhận mật khẩu mới"
            }
            variant="standard"
            fullWidth
            type={showConfirmNewPassword ? "text" : "password"}
            placeholder={
              language === "English"
                ? "Enter confirm new password"
                : "Nhập xác nhận mật khẩu mới"
            }
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
                setConfirmNewPasswordErrorMsg(
                  language === "English" ? "Required" : "Bắt buộc"
                );
                setConfirmNewPasswordErrorState(true);
              } else {
                if (e.target.value !== newPassword) {
                  setConfirmNewPasswordErrorMsg(
                    language === "English"
                      ? "Password confirmation does not match the new password"
                      : "Mật khẩu xác nhận không khớp với mật khẩu mới"
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
                {language === "English" ? "Save Changes" : "Lưu những thay đổi"}
              </Button>
              <Button
                color="success"
                variant="contained"
                fullWidth
                onClick={handleClickCancelEdit}
              >
                {language === "English" ? "Cancel" : "Hủy"}
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
                {language === "English" ? "Saving..." : "Đang lưu..."}
              </Button>
              <Button
                color="success"
                variant="outlined"
                disabled
                fullWidth
                onClick={handleClickCancelEdit}
              >
                {language === "English" ? "Cancel" : "Hủy"}
              </Button>
            </>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ChangePassword;
