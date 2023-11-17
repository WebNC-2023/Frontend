import "./HomePage.css";
import { useState } from "react";
import { Grid, Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip, Paper, TextField, Button, FormLabel, Typography, Alert } from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
import PasswordIcon from '@mui/icons-material/Password';
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import AlarmIcon from '@mui/icons-material/Alarm';
import axios from "axios";
let courses_list = [
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/illinois/iMBA+square.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Illinois Gies College of Business",
        course_name: "Master of Business Administration (iMBA)"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/ms-management-illinois/thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Illinois Urbana-Champaign",
        course_name: "Master of Science in Management (iMSM)"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/imsa/imsa-thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/d8/42cdc0ab2011e8b910bdf80bed9f6c/CenterILblock-ISQUAREOrangeBackgrnd.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "Gies College of Business at the University of Illinois",
        course_name: "Master's of Accounting (iMSA)"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/me-engineering-management-boulder/7f1ba63f-ce16-4c29-9690-557ac3eb3168.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Colorado Boulder",
        course_name: "Master of Engineering in Engineering Management"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/msds-boulder/header.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Colorado Boulder",
        course_name: "Master of Science in Data Science"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/msee-boulder/thumbnail.jpeg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Colorado Boulder",
        course_name: "Master of Science in Electrical Engineering"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/ms-computer-science-boulder/62f0f4eb-8630-41cb-bbeb-ca66ccb81fc6.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&fit=crop&q=50",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/a6/7035b7e00b401383be4e5856b8bdaa/Boulder-FL-VERT-B---cropped.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of Colorado Boulder",
        course_name: "Master of Science in Computer Science"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/bach-information-technology-illinois-tech/40ddc07b-ccec-49d4-b172-25ffcbdb6fe4.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/3d/1c8fdf7ef5404aa83ab0c00fa12cf5/LOGO_1.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "Illinois Institute of Technology",
        course_name: "Bachelor of Information Technology"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/bcs-uol/thumbnail.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/fb/b28a301e0211e8a40e23e4176c8e4a/UoL-Logo_180x180.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "University of London",
        course_name: "BSc Computer Science"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/msm-digital-transformation-healthcare-northeastern/a988cb18-82fc-4f29-87b9-315af6df02c0.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/6a/123cbd870d4619aab9613bb25578da/Red-N-on-white-background.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "Northeastern University",
        course_name: "Online MS in Management"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/mba-illinois-tech/14f38073-19e7-4f79-888d-7a9fd77b2398.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/3d/1c8fdf7ef5404aa83ab0c00fa12cf5/LOGO_1.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "Illinois Institute of Technology",
        course_name: "Master of Business Administration"
    },
    {
        course_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://s3.amazonaws.com/coursera_assets/ddp/branding/mas-information-technology-illinois-tech/1b37393a-cb27-4fd3-8c3c-f8413ff31123.jpg?auto=format%2Ccompress%2C%20enhance&dpr=2&w=265&h=204&q=50&fit=crop",
        university_img: "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/http://coursera-university-assets.s3.amazonaws.com/3d/1c8fdf7ef5404aa83ab0c00fa12cf5/LOGO_1.png?auto=format%2Ccompress&dpr=2&w=25&h=25&q=40",
        university_name: "Illinois Institute of Technology",
        course_name: "Master of Information Technology"
    },
];
const HomePage = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const [showScreen, setShowScreen] = useState("courses");
    const [firstNameErrorState, setFirstNameErrorState] = useState(false);
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState("");
    const [lastNameErrorState, setLastNameErrorState] = useState(false);
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState("");
    const [avatarUrlErrorState, setAvatarUrlErrorState] = useState(false);
    const [avatarUrlErrorMsg, setAvatarUrlErrorMsg] = useState("");
    const [avatarUrl, setAvatarUrl] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [avatarFile, setAvatarFile] = useState();
    const [editProfileSuccess, setEditProfileSuccess] = useState(false);
    const [showLoadingEditBtn, setShowLoadingEditBtn] = useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickEditProfileBtn = () => {
        setAnchorEl(null);
        setShowScreen("edit profile");
    }
    const handleClickLogOut = () => {
        navigate("/landing-page");
        setAnchorEl(null);
    };
    const handleClickSaveChange = () => {
        if (firstName === "") {
            setFirstNameErrorState(true);
            setFirstNameErrorMsg("Required");
        }
        if (lastName === "") {
            setLastNameErrorState(true);
            setLastNameErrorMsg("Required");
        }
        if (avatarUrl === "") {
            setAvatarUrlErrorState(true);
            setAvatarUrlErrorMsg("Required");
        }
        if (firstName !== "" && lastName !== "" && avatarFile && avatarUrl !== "" && !firstNameErrorState && !lastNameErrorState && !avatarUrlErrorState) {
            async function sendEditProfile() {
                setShowLoadingEditBtn(true);
                const res = await axios({
                    method: "PATCH",
                    url: "https://webnc-2023.vercel.app/users/update-profile",
                    withCredentials: true,
                    data: {
                        firstName: firstName,
                        lastName: lastName,
                        id: JSON.parse(localStorage.getItem("userInfo"))["id"],
                        avatar: avatarFile
                    }
                });
                return res;
            }
            sendEditProfile().then(res => {
                setShowLoadingEditBtn(false);
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                userInfo.firstName = res.data.data.firstName;
                userInfo.lastName = res.data.data.lastName;
                userInfo.avatar = res.data.data.avatar;
                userInfo.refreshToken = res.data.data.refreshToken
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                setFirstName("");
                setLastName("");
                setAvatarUrl("");
                setEditProfileSuccess(true);
            })
                .catch(err => console.log(err))
        }
    }
    const handleClickCancelEdit = () => {
        setShowScreen("courses");
    }
    return (
        <div className="home-page-container">
            <Grid container justifyContent="space-between" alignItems="center" style={{ height: "65px", padding: "0 20px", width: "100%", borderBottom: "1px solid #e0e0e0", backgroundColor: "white" }}>
                <Grid item>
                    <span className="home-page-logo">Learners</span>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                        <Typography style={{ userSelect: "none", fontSize: "0.75rem", position: "absolute", top: "0", right: "20px" }}>Hi, {JSON.parse(localStorage.getItem("userInfo"))["firstName"]} {JSON.parse(localStorage.getItem("userInfo"))["lastName"]}</Typography>
                        <Tooltip title="Account settings">
                            <IconButton
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={open ? 'account-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                            >
                                <Avatar src="https://bootdey.com/img/Content/avatar/avatar1.png" sx={{ width: 32, height: 32, backgroundColor: "#00897b" }}></Avatar>
                            </IconButton>
                        </Tooltip>
                    </Box>
                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: -0.5,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                        <MenuItem onClick={handleClickEditProfileBtn}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Edit profile
                        </MenuItem>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <PasswordIcon fontSize="small" />
                            </ListItemIcon>
                            Change password
                        </MenuItem>
                        <MenuItem onClick={handleClickLogOut}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            Logout
                        </MenuItem>
                    </Menu>
                </Grid>
            </Grid>
            {showScreen === "courses" ?
                (
                    <div className="courses-container">
                        <div className="courses">
                            {courses_list.map((course, id) => {
                                return (
                                    <div key={id} className="course-item">
                                        <div className="course-item-image">
                                            <img src={course.course_img} alt="course-img" />
                                        </div>
                                        <div className="course-university">
                                            <img src={course.university_img} alt="university-img" width="25px" height="25px" />
                                            <span>{course.university_name}</span>
                                        </div>
                                        <p className="course-name">
                                            {course.course_name}
                                        </p>
                                        <div className="course-earn-degree">
                                            <SchoolIcon />
                                            <span>Earn a degree</span>
                                        </div>
                                        <p className="course-degree">Degree</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                ) :
                showScreen === "edit profile" ?
                    (
                        <Grid container justifyContent={"center"} className="">
                            <Grid item xs={12} sm={8} md={4} className="editProfile-container" style={{ marginTop: "20px" }}>
                                {editProfileSuccess && <><Alert severity="success" className="change-edit-success">Change Successful</Alert><CloseIcon className="close-change-edit-success" onClick={() => setEditProfileSuccess(false)} /></>}
                                <Paper elevation={10} className="editProfile-form">
                                    <Grid container direction={"column"} alignItems={"center"}>
                                        <Avatar style={{ backgroundColor: "#1bbd7e" }}><AppRegistrationOutlinedIcon /></Avatar>
                                        <h2 className="editProfile-title">Edit profile</h2>
                                    </Grid>
                                    <TextField error={firstNameErrorState} helperText={firstNameErrorMsg} style={{ marginTop: "16px" }} label="First name" variant="standard" fullWidth placeholder="Enter first name" spellCheck="false" autoComplete="none" required value={firstName} onChange={e => {
                                        setFirstName(e.target.value);
                                        if (e.target.value === "") {
                                            setFirstNameErrorMsg("Require");
                                            setFirstNameErrorState(true);
                                        }
                                        else {
                                            setFirstNameErrorMsg("");
                                            setFirstNameErrorState(false);
                                        }
                                    }} />
                                    <TextField error={lastNameErrorState} helperText={lastNameErrorMsg} style={{ margin: "16px 0" }} label="Last name" variant="standard" fullWidth placeholder="Enter last name" spellCheck="false" autoComplete="none" required value={lastName} onChange={e => {
                                        setLastName(e.target.value);
                                        if (e.target.value === "") {
                                            setLastNameErrorMsg("Require");
                                            setLastNameErrorState(true);
                                        }
                                        else {
                                            setLastNameErrorMsg("");
                                            setLastNameErrorState(false);
                                        }
                                    }} />
                                    <FormLabel style={{ userSelect: "none" }}>Avatar</FormLabel>
                                    <TextField error={avatarUrlErrorState} helperText={avatarUrlErrorMsg} inputProps={{ accept: 'image/*' }} type="file" style={{ marginBottom: "16px" }} fullWidth variant="standard" value={avatarUrl} required onChange={e => {
                                        if (e.target.value) {
                                            setAvatarFile(e.target.files[0]);
                                            setAvatarUrlErrorMsg("");
                                            setAvatarUrlErrorState(false);
                                            setAvatarUrl(e.target.value);
                                        }
                                        else {
                                            setAvatarUrl("");
                                            setAvatarFile();
                                            setAvatarUrlErrorMsg("Require");
                                            setAvatarUrlErrorState(true);
                                        };

                                    }} />
                                    {!showLoadingEditBtn ? (<><Button style={{ margin: "16px 0" }} type="submit" endIcon={<SendIcon />} variant="contained" fullWidth onClick={handleClickSaveChange}>Save Changes</Button><Button color="success" variant="contained" fullWidth onClick={handleClickCancelEdit}>Cancel</Button></>)
                                        : (<><Button style={{ margin: "16px 0" }} type="submit" endIcon={<AlarmIcon />} variant="outlined" disabled fullWidth>Loading...</Button><Button color="success" variant="outlined" disabled fullWidth onClick={handleClickCancelEdit}>Cancel</Button></>)}
                                </Paper>
                            </Grid>
                        </Grid>
                    ) :
                    (
                        <>change password</>
                    )
            }
        </div>
    );
}

export default HomePage;