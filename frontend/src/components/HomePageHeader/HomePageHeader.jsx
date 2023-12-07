import "./HomePageHeader.css";
import {
  Grid,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Tooltip,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import { useState } from "react";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import PasswordIcon from "@mui/icons-material/Password";
//import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import InfoIcon from "@mui/icons-material/Info";
import Axios from "../../redux/APIs/Axios";
import MenuIcon from "@mui/icons-material/Menu";
import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import Collapse from "@mui/material/Collapse";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
const HomePageHeader = ({ showSidebar }) => {
  const avatarImg = useSelector((state) => state.fullNameUser.avatar);
  const fullName = useSelector((state) => state.fullNameUser.fullName);
  const dispatch = useDispatch();
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
    navigate("/change-password");
  };
  const handleClickEditProfileBtn = () => {
    setAnchorEl(null);
    navigate("/edit-profile");
  };
  const handleClickLogOut = () => {
    async function userLogout() {
      localStorage.removeItem("userInfo");
      const res = await Axios({
        url: "/auth/sign-out",
        method: "POST",
      });
      return res;
    }
    userLogout()
      .then((res) => {
        if (res.data.message === "Sign out successfully") {
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );
          navigate("/");
        }
      })
      .catch((error) => console.log(error));
    //setAnchorEl(null);
  };
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    if (open === false) setOpen1(false);
    setState({ ...state, [anchor]: open });
  };
  const [open1, setOpen1] = useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Màn hình chính", "Lịch"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>
                {index === 0 ? <HomeIcon /> : <CalendarTodayIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={handleClick1}>
          <ListItemIcon>
            <SchoolOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Đã đăng ký" />
          {open1 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
        </ListItemButton>
        <Collapse in={open1} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton
              sx={{ pl: 2 }}
              onClick={toggleDrawer(anchor, false)}
            >
              <ListItemIcon>
                <FactCheckOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Việc cần làm" />
            </ListItemButton>
          </List>
        </Collapse>
      </List>
      <Divider />
      <List>
        {["Lớp học đã lưu trữ", "Cài đặt"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={toggleDrawer(anchor, false)}>
              <ListItemIcon>
                {index === 0 ? <ArchiveOutlinedIcon /> : <SettingsIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <div>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        style={{
          minHeight: "65px",
          padding: "0 20px",
          width: "100%",
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "white",
          position: "fixed",
          top: "0",
          zIndex: "10"
        }}
      >
        <Grid item>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "-10px",
            }}
          >
            {showSidebar ? (
              <Tooltip title="Trình đơn chính">
                <IconButton onClick={toggleDrawer("left", true)}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <></>
            )}
            <Link
              style={{ marginLeft: "10px" }}
              to="/"
              className="home-page-logo"
            >
              Learners
            </Link>
          </div>
        </Grid>
        <Grid item>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="My account">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                style={{ marginTop: "5px" }}
              >
                <Avatar
                  src={avatarImg}
                  sx={{ width: 32, height: 32, backgroundColor: "#5175e0" }}
                ></Avatar>
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
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <div
              className="userInfo-mobile-screen"
              style={{ pointerEvents: "none" }}
            >
              <MenuItem>
                <ListItemIcon>
                  <InfoIcon fontSize="small" />
                </ListItemIcon>
                Hi, {fullName}
              </MenuItem>
            </div>
            <MenuItem onClick={handleClickEditProfileBtn}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Edit profile
            </MenuItem>
            {JSON.parse(localStorage.getItem("userInfo")) &&
              JSON.parse(localStorage.getItem("userInfo")).isSSO === false && (
                <MenuItem onClick={handleClickChangePasswordBtn}>
                  <ListItemIcon>
                    <PasswordIcon fontSize="small" />
                  </ListItemIcon>
                  Change password
                </MenuItem>
              )}
            <MenuItem onClick={handleClickLogOut}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Grid>
        <p className="userInfo-default-screen"> Hi, {fullName}</p>
      </Grid>
      <Drawer
        anchor="left"
        open={state["left"]}
        onClose={toggleDrawer("left", false)}
      >
        {list("left")}
      </Drawer>
    </div>
  );
};

export default HomePageHeader;
