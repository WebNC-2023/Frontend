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
  Stack,
} from "@mui/material";
import Settings from "@mui/icons-material/Settings";
import { useState, useContext } from "react";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import PasswordIcon from "@mui/icons-material/Password";
//import axios from "axios";
import { DataContext } from "../../contexts/DataContext";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InfoIcon from "@mui/icons-material/Info";
import InputIcon from "@mui/icons-material/Input";
import FormDialogCreateClass from "../FormDialog/FormDialogCreateClass";
import Axios from "../../redux/APIs/Axios";

const HomePageHeader = () => {
  const avatarImg = useSelector((state) => state.fullNameUser.avatar);
  const { setShowScreen } = useContext(DataContext);
  const fullName = useSelector((state) => state.fullNameUser.fullName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [classAnchorEl, setClassAnchorEl] = useState(null);
  const [openDialogCreateClass, setOpenDialogCreateClass] = useState(false);
  const openMenuClass = Boolean(classAnchorEl);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCreateClick = (event) => {
    setClassAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClassClose = () => {
    setClassAnchorEl(null);
  };
  const handleClickChangePasswordBtn = () => {
    setAnchorEl(null);
    setShowScreen("change password");
  };
  const handleClickEditProfileBtn = () => {
    setAnchorEl(null);
    setShowScreen("edit profile");
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

  // Handle create & join Class

  const handleOpenDialogCreate = () => {
    setOpenDialogCreateClass(true);
  };

  const handleCloseDialogCreate = () => {
    setOpenDialogCreateClass(false);
  };

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      style={{
        height: "65px",
        padding: "0 20px",
        width: "100%",
        borderBottom: "1px solid #e0e0e0",
        backgroundColor: "white",
        position: "relative",
      }}
    >
      <Grid item>
        <Link to="/" className="home-page-logo">
          Learners
        </Link>
      </Grid>
      <Grid item>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {/* Start Button create class */}
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            {/* CreateClass */}
            <Tooltip title="Create or join a class">
              <IconButton
                onClick={handleCreateClick}
                aria-label="create"
                sx={{ color: "#5175e0" }}
                size="large"
                aria-controls={openMenuClass ? "class-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenuClass ? "true" : undefined}
              >
                <AddOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
            {/* Applications */}
            <Tooltip title="Applications">
              <IconButton
                aria-label="App"
                sx={{ color: "#5175e0" }}
                size="large"
              >
                <AppsOutlinedIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Stack>
          {/* End Button create class */}
          <p className="userInfo-default-screen"> Hi, {fullName}</p>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="My account">
              <IconButton
                onClick={handleClick}
                size="small"
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
        </Stack>
        {/* Menu Class */}
        <Menu
          anchorEl={classAnchorEl}
          id="class-menu"
          open={openMenuClass}
          onClose={handleClassClose}
          onClick={handleClassClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 0.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1.5,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 20,
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
          <MenuItem onClick={handleOpenDialogCreate}>
            <ListItemIcon>
              <AddCircleOutlineIcon
                fontSize="small"
                sx={{ color: "#5175e0" }}
              />
            </ListItemIcon>
            Create classes
          </MenuItem>

          <MenuItem>
            <ListItemIcon>
              <InputIcon fontSize="small" sx={{ color: "#5175e0" }} />
            </ListItemIcon>
            Join the class
          </MenuItem>
        </Menu>
        {/* Menu Account */}
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
                <InfoIcon fontSize="small" sx={{ color: "#5175e0" }} />
              </ListItemIcon>
              Hi, {fullName}
            </MenuItem>
          </div>
          <MenuItem onClick={handleClickEditProfileBtn}>
            <ListItemIcon>
              <Settings fontSize="small" sx={{ color: "#5175e0" }} />
            </ListItemIcon>
            Edit profile
          </MenuItem>
          {JSON.parse(localStorage.getItem("userInfo")) &&
            JSON.parse(localStorage.getItem("userInfo")).isSSO === false && (
              <MenuItem onClick={handleClickChangePasswordBtn}>
                <ListItemIcon>
                  <PasswordIcon fontSize="small" sx={{ color: "#5175e0" }} />
                </ListItemIcon>
                Change password
              </MenuItem>
            )}
          <MenuItem onClick={handleClickLogOut}>
            <ListItemIcon>
              <Logout fontSize="small" sx={{ color: "#5175e0" }} />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
        {/* Dialog Create Class */}
        <FormDialogCreateClass
          open={openDialogCreateClass}
          handleClose={handleCloseDialogCreate}
        />
      </Grid>
    </Grid>
  );
};

export default HomePageHeader;
