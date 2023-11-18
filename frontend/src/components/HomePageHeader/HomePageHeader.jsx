import { Grid, Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip, Typography } from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import { useState, useContext } from "react";
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import PasswordIcon from '@mui/icons-material/Password';
import axios from "axios";
import { DataContext } from "../../contexts/DataContext";
const HomePageHeader = () => {
    const { setShowScreen, fullName } = useContext(DataContext);
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleClickChangePasswordBtn = () => {
        setAnchorEl(null);
        setShowScreen("change password");
    };
    const handleClickEditProfileBtn = () => {
        setAnchorEl(null);
        setShowScreen("edit profile");
    }
    const handleClickLogOut = () => {
        async function userLogout() {
            const res = await axios({
                url: "https://webnc-2023.vercel.app/auth/sign-out",
                method: "POST",
                withCredentials: true,
            });
            return res;
        }
        userLogout().then(res => {
            localStorage.removeItem("userInfo");
            if (res.data.message === "Sign out successfully") {
                navigate("/landing-page");
            }
        })
            .catch(error => console.log(error))
        //setAnchorEl(null);
    };
    return (
        <Grid container justifyContent="space-between" alignItems="center" style={{ height: "65px", padding: "0 20px", width: "100%", borderBottom: "1px solid #e0e0e0", backgroundColor: "white" }}>
            <Grid item>
                <span className="home-page-logo">Learners</span>
            </Grid>
            <Grid item>
                <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                    <Typography style={{ userSelect: "none", fontSize: "0.7rem", position: "absolute", top: "0", right: "10px" }}>Hi, {fullName}</Typography>
                    <Tooltip title="My account">
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
                    <MenuItem onClick={handleClickChangePasswordBtn}>
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
    );
}

export default HomePageHeader;