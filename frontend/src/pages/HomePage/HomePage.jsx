import "./HomePage.css";
import { useState } from "react";
import { Grid, Box, Avatar, Menu, MenuItem, ListItemIcon, IconButton, Tooltip } from "@mui/material";
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
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
                    <span className="home-page-header-classroom">Lớp học</span>
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
                                <Avatar sx={{ width: 32, height: 32, backgroundColor: "#00897b" }}>H</Avatar>
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
            <div className="home-page-content">
                <div className="home-page-items-container">
                    <div className="home-page-items">
                        <div className="home-page-item">
                            <div className="user-avatar">
                                <img src="https://bootdey.com/img/Content/avatar/avatar5.png" alt="" />
                            </div>
                            <p className="user-name">John Doe</p>
                            <div className="user-email">
                                <p className="user-email-title">Email address</p>
                                <p className="user-email-content">hannagover@gmail.com</p>
                            </div>
                            <div className="user-phone">
                                <p className="user-phone-title">Phone</p>
                                <p className="user-phone-content">+91 654 784 547</p>
                            </div>
                            <div className="user-address">
                                <p className="user-address-title">Address</p>
                                <p className="user-address-content">71 Pilgrim Avenue Chevy Chase, MD 20815</p>
                            </div>
                            <div className="user-status">
                                <p className="user-status-title">Status</p>
                                <div className="user-online">
                                    <span className="user-online-icon"></span>
                                    <span className="user-online-content">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="home-page-item">
                            <div className="user-avatar">
                                <img src="https://bootdey.com/img/Content/avatar/avatar4.png" alt="" />
                            </div>
                            <p className="user-name">John Doe</p>
                            <div className="user-email">
                                <p className="user-email-title">Email address</p>
                                <p className="user-email-content">hannagover@gmail.com</p>
                            </div>
                            <div className="user-phone">
                                <p className="user-phone-title">Phone</p>
                                <p className="user-phone-content">+91 654 784 547</p>
                            </div>
                            <div className="user-address">
                                <p className="user-address-title">Address</p>
                                <p className="user-address-content">71 Pilgrim Avenue Chevy Chase, MD 20815</p>
                            </div>
                            <div className="user-status">
                                <p className="user-status-title">Status</p>
                                <div className="user-online">
                                    <span className="user-online-icon"></span>
                                    <span className="user-online-content">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="home-page-item">
                            <div className="user-avatar">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="" />
                            </div>
                            <p className="user-name">John Doe</p>
                            <div className="user-email">
                                <p className="user-email-title">Email address</p>
                                <p className="user-email-content">hannagover@gmail.com</p>
                            </div>
                            <div className="user-phone">
                                <p className="user-phone-title">Phone</p>
                                <p className="user-phone-content">+91 654 784 547</p>
                            </div>
                            <div className="user-address">
                                <p className="user-address-title">Address</p>
                                <p className="user-address-content">71 Pilgrim Avenue Chevy Chase, MD 20815</p>
                            </div>
                            <div className="user-status">
                                <p className="user-status-title">Status</p>
                                <div className="user-online">
                                    <span className="user-online-icon"></span>
                                    <span className="user-online-content">Online</span>
                                </div>
                            </div>
                        </div>
                        <div className="home-page-item">
                            <div className="user-avatar">
                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                            </div>
                            <p className="user-name">John Doe</p>
                            <div className="user-email">
                                <p className="user-email-title">Email address</p>
                                <p className="user-email-content">hannagover@gmail.com</p>
                            </div>
                            <div className="user-phone">
                                <p className="user-phone-title">Phone</p>
                                <p className="user-phone-content">+91 654 784 547</p>
                            </div>
                            <div className="user-address">
                                <p className="user-address-title">Address</p>
                                <p className="user-address-content">71 Pilgrim Avenue Chevy Chase, MD 20815</p>
                            </div>
                            <div className="user-status">
                                <p className="user-status-title">Status</p>
                                <div className="user-offline">
                                    <span className="user-offline-icon"></span>
                                    <span className="user-offline-content">Offline</span>
                                </div>
                            </div>
                        </div>
                        <div className="home-page-item">
                            <div className="user-avatar">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="" />
                            </div>
                            <p className="user-name">John Doe</p>
                            <div className="user-email">
                                <p className="user-email-title">Email address</p>
                                <p className="user-email-content">hannagover@gmail.com</p>
                            </div>
                            <div className="user-phone">
                                <p className="user-phone-title">Phone</p>
                                <p className="user-phone-content">+91 654 784 547</p>
                            </div>
                            <div className="user-address">
                                <p className="user-address-title">Address</p>
                                <p className="user-address-content">71 Pilgrim Avenue Chevy Chase, MD 20815</p>
                            </div>
                            <div className="user-status">
                                <p className="user-status-title">Status</p>
                                <div className="user-offline">
                                    <span className="user-offline-icon"></span>
                                    <span className="user-offline-content">Offline</span>
                                </div>
                            </div>
                        </div>
                        <div className="home-page-item">
                            <div className="user-avatar">
                                <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
                            </div>
                            <p className="user-name">John Doe</p>
                            <div className="user-email">
                                <p className="user-email-title">Email address</p>
                                <p className="user-email-content">hannagover@gmail.com</p>
                            </div>
                            <div className="user-phone">
                                <p className="user-phone-title">Phone</p>
                                <p className="user-phone-content">+91 654 784 547</p>
                            </div>
                            <div className="user-address">
                                <p className="user-address-title">Address</p>
                                <p className="user-address-content">71 Pilgrim Avenue Chevy Chase, MD 20815</p>
                            </div>
                            <div className="user-status">
                                <p className="user-status-title">Status</p>
                                <div className="user-offline">
                                    <span className="user-offline-icon"></span>
                                    <span className="user-offline-content">Offline</span>
                                </div>
                            </div>
                        </div>
                        <div className="home-page-item">
                            <div className="user-avatar">
                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="" />
                            </div>
                            <p className="user-name">John Doe</p>
                            <div className="user-email">
                                <p className="user-email-title">Email address</p>
                                <p className="user-email-content">hannagover@gmail.com</p>
                            </div>
                            <div className="user-phone">
                                <p className="user-phone-title">Phone</p>
                                <p className="user-phone-content">+91 654 784 547</p>
                            </div>
                            <div className="user-address">
                                <p className="user-address-title">Address</p>
                                <p className="user-address-content">71 Pilgrim Avenue Chevy Chase, MD 20815</p>
                            </div>
                            <div className="user-status">
                                <p className="user-status-title">Status</p>
                                <div className="user-offline">
                                    <span className="user-offline-icon"></span>
                                    <span className="user-offline-content">Offline</span>
                                </div>
                            </div>
                        </div>
                        <div className="home-page-item">
                            <div className="user-avatar">
                                <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="" />
                            </div>
                            <p className="user-name">John Doe</p>
                            <div className="user-email">
                                <p className="user-email-title">Email address</p>
                                <p className="user-email-content">hannagover@gmail.com</p>
                            </div>
                            <div className="user-phone">
                                <p className="user-phone-title">Phone</p>
                                <p className="user-phone-content">+91 654 784 547</p>
                            </div>
                            <div className="user-address">
                                <p className="user-address-title">Address</p>
                                <p className="user-address-content">71 Pilgrim Avenue Chevy Chase, MD 20815</p>
                            </div>
                            <div className="user-status">
                                <p className="user-status-title">Status</p>
                                <div className="user-offline">
                                    <span className="user-offline-icon"></span>
                                    <span className="user-offline-content">Offline</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;