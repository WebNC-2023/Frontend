import {
  Grid,
  Paper,
  Avatar,
  TextField,
  FormLabel,
  Button,
} from "@mui/material";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import SendIcon from "@mui/icons-material/Send";
import AlarmIcon from "@mui/icons-material/Alarm";
import { useState } from "react";
//import axios from "axios";
import { useDispatch } from "react-redux";
import { update, updateStart } from "../../redux/Reducers/fullNameUserSlice";
import { toast } from "react-toastify";
import Axios from "../../redux/APIs/Axios";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const navigate = useNavigate();
  const [firstNameErrorState, setFirstNameErrorState] = useState(false);
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState("");
  const [lastNameErrorState, setLastNameErrorState] = useState(false);
  const [lastName, setLastName] = useState("");
  const [avatarUrlErrorState, setAvatarUrlErrorState] = useState(false);
  const [avatarUrlErrorMsg, setAvatarUrlErrorMsg] = useState("");
  const [avatarFile, setAvatarFile] = useState();
  const [avatarUrl, setAvatarUrl] = useState("");
  const [showLoadingEditBtn, setShowLoadingEditBtn] = useState(false);
  const dispatch = useDispatch();
  const handleClickSaveChangeEditProfile = () => {
    if (firstName === "" && lastName === "" && avatarUrl === "") {
      setFirstNameErrorState(true);
      setFirstNameErrorMsg("Requires at least one field to have data.");
      setLastNameErrorState(true);
      setLastNameErrorMsg("Requires at least one field to have data.");
      setAvatarUrlErrorState(true);
      setAvatarUrlErrorMsg("Requires at least one field to have data.");
    } else {
      let dataEdit = {
        id: JSON.parse(localStorage.getItem("userInfo"))["id"],
      };
      if (firstName !== "") dataEdit.firstName = firstName;
      if (lastName !== "") dataEdit.lastName = lastName;
      if (avatarUrl !== "") dataEdit.avatar = avatarFile;
      async function sendEditProfile() {
        setShowLoadingEditBtn(true);
        dispatch(updateStart());
        const res = await Axios({
          method: "PATCH",
          url: "/users/update-profile",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          data: {
            ...dataEdit,
          },
        });
        return res;
      }
      sendEditProfile()
        .then((res) => {
          setShowLoadingEditBtn(false);
          localStorage.setItem("userInfo", JSON.stringify(res.data.data));
          setFirstName("");
          setLastName("");
          setAvatarUrl("");
          setAvatarFile();
          dispatch(
            update({
              fullName: `${res.data.data.firstName} ${res.data.data.lastName}`,
              avatar: `${process.env.REACT_APP_SERVER_BASE_URL}/files/${
                res.data.data.avatar
              }?${Date.now()}`,
            })
          );
          toast.success("Your profile has been changed successful");
        })
        .catch((err) => {
          setShowLoadingEditBtn(false);
          if (
            err?.response?.status === 401 &&
            err?.response?.data === "Unauthorized"
          ) {
            toast.error(`${err?.response?.data}`);
            setTimeout(() => {
              navigate("/");
            }, 4000);
          } else {
            toast.error("Your profile has been changed fail");
          }
        });
    }
  };
  const handleClickCancelEdit = () => {
    navigate("/home-page");
  };
  return (
    <Grid container justifyContent={"center"}>
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
              <AppRegistrationOutlinedIcon />
            </Avatar>
            <h2 className="editProfile-title">Edit profile</h2>
          </Grid>
          <TextField
            disabled={showLoadingEditBtn}
            error={firstNameErrorState}
            helperText={firstNameErrorMsg}
            style={
              showLoadingEditBtn
                ? { marginTop: "16px", pointerEvents: "none" }
                : { marginTop: "16px" }
            }
            label="First name"
            variant="standard"
            fullWidth
            placeholder="Enter first name"
            spellCheck="false"
            autoComplete="none"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (e.target.value === "") {
                if (lastName === "" && avatarUrl === "") {
                  setFirstNameErrorState(true);
                  setFirstNameErrorMsg(
                    "Requires at least one field to have data."
                  );
                  setLastNameErrorState(true);
                  setLastNameErrorMsg(
                    "Requires at least one field to have data."
                  );
                  setAvatarUrlErrorState(true);
                  setAvatarUrlErrorMsg(
                    "Requires at least one field to have data."
                  );
                } else {
                  setFirstNameErrorState(false);
                  setFirstNameErrorMsg("");
                  setLastNameErrorState(false);
                  setLastNameErrorMsg("");
                  setAvatarUrlErrorState(false);
                  setAvatarUrlErrorMsg("");
                }
              } else {
                setFirstNameErrorState(false);
                setFirstNameErrorMsg("");
                setLastNameErrorState(false);
                setLastNameErrorMsg("");
                setAvatarUrlErrorState(false);
                setAvatarUrlErrorMsg("");
              }
            }}
          />
          <TextField
            disabled={showLoadingEditBtn}
            error={lastNameErrorState}
            helperText={lastNameErrorMsg}
            style={
              showLoadingEditBtn
                ? { margin: "16px 0", pointerEvents: "none" }
                : { margin: "16px 0" }
            }
            label="Last name"
            variant="standard"
            fullWidth
            placeholder="Enter last name"
            spellCheck="false"
            autoComplete="none"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (e.target.value === "") {
                if (firstName === "" && avatarUrl === "") {
                  setFirstNameErrorState(true);
                  setFirstNameErrorMsg(
                    "Requires at least one field to have data."
                  );
                  setLastNameErrorState(true);
                  setLastNameErrorMsg(
                    "Requires at least one field to have data."
                  );
                  setAvatarUrlErrorState(true);
                  setAvatarUrlErrorMsg(
                    "Requires at least one field to have data."
                  );
                } else {
                  setFirstNameErrorState(false);
                  setFirstNameErrorMsg("");
                  setLastNameErrorState(false);
                  setLastNameErrorMsg("");
                  setAvatarUrlErrorState(false);
                  setAvatarUrlErrorMsg("");
                }
              } else {
                setFirstNameErrorState(false);
                setFirstNameErrorMsg("");
                setLastNameErrorState(false);
                setLastNameErrorMsg("");
                setAvatarUrlErrorState(false);
                setAvatarUrlErrorMsg("");
              }
            }}
          />
          <FormLabel style={{ userSelect: "none" }}>Avatar</FormLabel>
          <TextField
            disabled={showLoadingEditBtn}
            error={avatarUrlErrorState}
            helperText={avatarUrlErrorMsg}
            inputProps={{ accept: "image/*" }}
            type="file"
            style={
              showLoadingEditBtn
                ? { marginBottom: "16px", pointerEvents: "none" }
                : { marginBottom: "16px" }
            }
            fullWidth
            variant="standard"
            value={avatarUrl}
            onChange={(e) => {
              if (e.target.value) {
                setAvatarFile(e.target.files[0]);
                setAvatarUrl(e.target.value);
                setFirstNameErrorState(false);
                setFirstNameErrorMsg("");
                setLastNameErrorState(false);
                setLastNameErrorMsg("");
                setAvatarUrlErrorState(false);
                setAvatarUrlErrorMsg("");
              } else {
                setAvatarFile();
                setAvatarUrl("");
                if (firstName === "" && lastName === "") {
                  setFirstNameErrorState(true);
                  setFirstNameErrorMsg(
                    "Requires at least one field to have data."
                  );
                  setLastNameErrorState(true);
                  setLastNameErrorMsg(
                    "Requires at least one field to have data."
                  );
                  setAvatarUrlErrorState(true);
                  setAvatarUrlErrorMsg(
                    "Requires at least one field to have data."
                  );
                } else {
                  setFirstNameErrorState(false);
                  setFirstNameErrorMsg("");
                  setLastNameErrorState(false);
                  setLastNameErrorMsg("");
                  setAvatarUrlErrorState(false);
                  setAvatarUrlErrorMsg("");
                }
              }
            }}
          />
          {!showLoadingEditBtn ? (
            <>
              <Button
                style={{ margin: "16px 0" }}
                type="submit"
                endIcon={<SendIcon />}
                variant="contained"
                fullWidth
                onClick={handleClickSaveChangeEditProfile}
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
    </Grid>
  );
};

export default EditProfile;
