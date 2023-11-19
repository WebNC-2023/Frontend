import { Grid, Alert, Paper, Avatar, TextField, FormLabel, Button } from "@mui/material";
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import AlarmIcon from '@mui/icons-material/Alarm';
import { useState, useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
import axios from "axios";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
const EditProfile = () => {
    const [editProfileSuccess, setEditProfileSuccess] = useState(false);
    const [editProfileError, setEditProfileError] = useState(false);
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
    const { setShowScreen, setAvatarURL } = useContext(DataContext);
    const dispatch = useDispatch();
    const handleClickSaveChangeEditProfile = () => {
        if (firstName === "" && lastName === "" && avatarUrl === "") {
            setFirstNameErrorState(true);
            setFirstNameErrorMsg("Requires at least one field to have data.");
            setLastNameErrorState(true);
            setLastNameErrorMsg("Requires at least one field to have data.");
            setAvatarUrlErrorState(true);
            setAvatarUrlErrorMsg("Requires at least one field to have data.");
        }
        else {
            let dataEdit = {
                id: JSON.parse(localStorage.getItem("userInfo"))["id"]
            }
            if (firstName !== "") dataEdit.firstName = firstName;
            if (lastName !== "") dataEdit.lastName = lastName;
            if (avatarUrl !== "") dataEdit.avatar = avatarFile;
            async function sendEditProfile() {
                setShowLoadingEditBtn(true);
                const res = await axios({
                    method: "PATCH",
                    url: "https://webnc-2023.vercel.app/users/update-profile",
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true,
                    data: {
                        ...dataEdit
                    }
                });
                return res;
            }
            sendEditProfile().then(res => {
                setShowLoadingEditBtn(false);
                console.log(res.data.data);
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                userInfo.firstName = res.data.data.firstName;
                userInfo.lastName = res.data.data.lastName;
                userInfo.avatar = res.data.data.avatar;
                userInfo.refreshToken = res.data.data.refreshToken;
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                setFirstName("");
                setLastName("");
                setAvatarUrl("");
                setAvatarFile();
                dispatch(update({
                    fullName: `${res.data.data.firstName} ${res.data.data.lastName}`
                }));
                setAvatarURL(`https://webnc-2023.vercel.app/files/${res.data.data.avatar}?${Date.now()}`)
                setEditProfileSuccess(true);
            })
                .catch(err => {
                    setShowLoadingEditBtn(false);
                    setEditProfileError(true);
                })
        }
    }
    const handleClickCancelEdit = () => {
        setShowScreen("courses");
    }
    return (
        <Grid container justifyContent={"center"} className="">
            <Grid item xs={12} sm={8} md={4} className="editProfile-container" style={{ marginTop: "20px" }}>
                {editProfileSuccess && <><Alert severity="success" className="change-edit-success">Change profile Successful</Alert><CloseIcon className="close-change-edit-success" onClick={() => setEditProfileSuccess(false)} /></>}
                {editProfileError && <><Alert severity="error" className="change-edit-error">Change profile Fail</Alert><CloseIcon className="close-change-edit-error" onClick={() => setEditProfileError(false)} /></>}
                <Paper elevation={10} className="editProfile-form">
                    <Grid container direction={"column"} alignItems={"center"}>
                        <Avatar style={{ backgroundColor: "#1bbd7e" }}><AppRegistrationOutlinedIcon /></Avatar>
                        <h2 className="editProfile-title">Edit profile</h2>
                    </Grid>
                    <TextField error={firstNameErrorState} helperText={firstNameErrorMsg} style={{ marginTop: "16px" }} label="First name" variant="standard" fullWidth placeholder="Enter first name" spellCheck="false" autoComplete="none" required value={firstName} onChange={e => {
                        setFirstName(e.target.value);
                        if (e.target.value === "") {
                            if (lastName === "" && avatarUrl === "") {
                                setFirstNameErrorState(true);
                                setFirstNameErrorMsg("Requires at least one field to have data.");
                                setLastNameErrorState(true);
                                setLastNameErrorMsg("Requires at least one field to have data.");
                                setAvatarUrlErrorState(true);
                                setAvatarUrlErrorMsg("Requires at least one field to have data.");
                            }
                            else {
                                setFirstNameErrorState(false);
                                setFirstNameErrorMsg("");
                                setLastNameErrorState(false);
                                setLastNameErrorMsg("");
                                setAvatarUrlErrorState(false);
                                setAvatarUrlErrorMsg("");
                            }
                        }
                        else {
                            setFirstNameErrorState(false);
                            setFirstNameErrorMsg("");
                            setLastNameErrorState(false);
                            setLastNameErrorMsg("");
                            setAvatarUrlErrorState(false);
                            setAvatarUrlErrorMsg("");
                        }
                    }} />
                    <TextField error={lastNameErrorState} helperText={lastNameErrorMsg} style={{ margin: "16px 0" }} label="Last name" variant="standard" fullWidth placeholder="Enter last name" spellCheck="false" autoComplete="none" required value={lastName} onChange={e => {
                        setLastName(e.target.value);
                        if (e.target.value === "") {
                            if (firstName === "" && avatarUrl === "") {
                                setFirstNameErrorState(true);
                                setFirstNameErrorMsg("Requires at least one field to have data.");
                                setLastNameErrorState(true);
                                setLastNameErrorMsg("Requires at least one field to have data.");
                                setAvatarUrlErrorState(true);
                                setAvatarUrlErrorMsg("Requires at least one field to have data.");
                            }
                            else {
                                setFirstNameErrorState(false);
                                setFirstNameErrorMsg("");
                                setLastNameErrorState(false);
                                setLastNameErrorMsg("");
                                setAvatarUrlErrorState(false);
                                setAvatarUrlErrorMsg("");
                            }
                        }
                        else {
                            setFirstNameErrorState(false);
                            setFirstNameErrorMsg("");
                            setLastNameErrorState(false);
                            setLastNameErrorMsg("");
                            setAvatarUrlErrorState(false);
                            setAvatarUrlErrorMsg("");
                        }
                    }} />
                    <FormLabel style={{ userSelect: "none" }}>Avatar</FormLabel>
                    <TextField error={avatarUrlErrorState} helperText={avatarUrlErrorMsg} inputProps={{ accept: 'image/*' }} type="file" style={{ marginBottom: "16px" }} fullWidth variant="standard" value={avatarUrl} required onChange={e => {
                        if (e.target.value) {
                            setAvatarFile(e.target.files[0]);
                            setAvatarUrl(e.target.value);
                            setFirstNameErrorState(false);
                            setFirstNameErrorMsg("");
                            setLastNameErrorState(false);
                            setLastNameErrorMsg("");
                            setAvatarUrlErrorState(false);
                            setAvatarUrlErrorMsg("");
                        }
                        else {
                            setAvatarFile();
                            setAvatarUrl("");
                            if (firstName === "" && lastName === "") {
                                setFirstNameErrorState(true);
                                setFirstNameErrorMsg("Requires at least one field to have data.");
                                setLastNameErrorState(true);
                                setLastNameErrorMsg("Requires at least one field to have data.");
                                setAvatarUrlErrorState(true);
                                setAvatarUrlErrorMsg("Requires at least one field to have data.");
                            }
                            else {
                                setFirstNameErrorState(false);
                                setFirstNameErrorMsg("");
                                setLastNameErrorState(false);
                                setLastNameErrorMsg("");
                                setAvatarUrlErrorState(false);
                                setAvatarUrlErrorMsg("");
                            }
                        };

                    }} />
                    {!showLoadingEditBtn ? (<><Button style={{ margin: "16px 0" }} type="submit" endIcon={<SendIcon />} variant="contained" fullWidth onClick={handleClickSaveChangeEditProfile}>Save Changes</Button><Button color="success" variant="contained" fullWidth onClick={handleClickCancelEdit}>Cancel</Button></>)
                        : (<><Button style={{ margin: "16px 0" }} type="submit" endIcon={<AlarmIcon />} variant="outlined" disabled fullWidth>In processing...</Button><Button color="success" variant="outlined" disabled fullWidth onClick={handleClickCancelEdit}>Cancel</Button></>)}
                </Paper>
            </Grid>
        </Grid>
    );
}

export default EditProfile;