import "./HomePage.css";
import { useState } from "react";
import { Grid, Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip } from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
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
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickLogOut = () => {
        navigate("/landing-page");
        setAnchorEl(null);
    };
    return (
        <div className="home-page-container">
            <Grid container justifyContent="space-between" alignItems="center" style={{ height: "65px", padding: "0 20px", width: "100%", borderBottom: "1px solid #e0e0e0", backgroundColor: "white" }}>
                <Grid item>
                    <span className="home-page-logo">Learners</span>
                    <span className="home-page-header-classroom">Courses</span>
                </Grid>
                <Grid item>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
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
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            Edit profile
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
            <div className="courses-container">
                <div className="courses">
                    {courses_list.map((course, id) => {
                        return (
                            <div className="course-item">
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
        </div>
    );
}

export default HomePage;