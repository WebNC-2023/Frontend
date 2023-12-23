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
import { useState } from "react";
import Logout from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";
import PasswordIcon from "@mui/icons-material/Password";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import InfoIcon from "@mui/icons-material/Info";
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
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InputIcon from "@mui/icons-material/Input";
import FormDialogCreateClass from "../FormDialog/FormDialogCreateClass";
import FormDialogJoinClass from "../FormDialog/FormDialogJoinClass";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import * as userApi from "../../redux/APIs/userServices";

const HomePageHeader = ({ showSidebar, classRoom }) => {
  const avatarImg = useSelector((state) => state.fullNameUser.avatar);
  const fullName = useSelector((state) => state.fullNameUser.fullName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [classAnchorEl, setClassAnchorEl] = useState(null);
  const [openDialogCreateClass, setOpenDialogCreateClass] = useState(false);
  const [openDialogJoinClass, setOpenDialogJoinClass] = useState(false);
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
    navigate("/change-password");
  };
  const handleClickEditProfileBtn = () => {
    setAnchorEl(null);
    navigate("/edit-profile");
  };
  const handleClickLogOut = () => {
    userApi.logoutService();
    dispatch(
      update({
        fullName: " ",
        avatar: "",
      })
    );
    navigate("/");
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
    if (open === false) {
      setOpen1(false);
      setOpen2(false);
    }
    setState({ ...state, [anchor]: open });
  };
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);

  const handleClick1 = () => {
    setOpen1(!open1);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };
  // Handle create & join Class

  const handleOpenDialogCreate = () => {
    setOpenDialogCreateClass(true);
  };

  const handleCloseDialogCreate = () => {
    setOpenDialogCreateClass(false);
  };

  const handleOpenDialogJoin = () => {
    setOpenDialogJoinClass(true);
  };
  const handleCloseDialogJoin = () => {
    setOpenDialogJoinClass(false);
  };
  const handleClickSidebarClass = (anchor, classroomID) => {
    setState({ ...state, [anchor]: false });
    navigate(`/class-details/${classroomID}?tab=1`);
  };
  const handleClickList1 = (anchor, text) => {
    if (text === "Màn hình chính") {
      setState({ ...state, [anchor]: false });
      navigate("/home-page");
    } else setState({ ...state, [anchor]: false });
  };
  const classes = useSelector((state) => state.classes.classes);
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Màn hình chính", "Lịch"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            onClick={() => handleClickList1("left", text)}
          >
            <ListItemButton>
              <ListItemIcon>
                {index === 0 ? <HomeIcon /> : <CalendarTodayIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      {classes !== undefined &&
      classes.filter((element) => element.role === "teacher").length > 0 ? (
        <>
          <Divider />
          <List>
            <ListItemButton onClick={handleClick2}>
              <ListItemIcon>
                <SupervisorAccountOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Giảng dạy" />
              {open2 ? <ArrowDropDownIcon /> : <ArrowRightIcon />}
            </ListItemButton>
            <Collapse in={open2} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton
                  sx={{ pl: 2 }}
                  onClick={toggleDrawer(anchor, false)}
                >
                  <ListItemIcon>
                    <SourceOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText primary="Cần xem xét" />
                </ListItemButton>
                {classes
                  .filter((element) => element.role === "teacher")
                  .map((classroom) => (
                    <ListItemButton
                      key={classroom.id}
                      sx={{ pl: 2 }}
                      onClick={() =>
                        handleClickSidebarClass("left", classroom.id)
                      }
                    >
                      <ListItemIcon>
                        <Avatar
                          src={
                            classroom.avatar === null
                              ? ""
                              : `${process.env.REACT_APP_SERVER_BASE_URL}/files/${classroom.avatar}`
                          }
                          sx={
                            classroom.avatar === null
                              ? {
                                  backgroundColor: "#1967d2",
                                }
                              : {}
                          }
                        >
                          {classroom.avatar === null
                            ? `${classroom.name.toUpperCase()[0]}`
                            : ""}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={classroom.name} />
                    </ListItemButton>
                  ))}
              </List>
            </Collapse>
          </List>
        </>
      ) : (
        <></>
      )}
      {classes !== undefined &&
      classes.filter((element) => element.role === "student").length > 0 ? (
        <>
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
                {classes
                  .filter((element) => element.role === "student")
                  .map((classroom) => (
                    <ListItemButton
                      key={classroom.id}
                      sx={{ pl: 2 }}
                      onClick={() =>
                        handleClickSidebarClass("left", classroom.id)
                      }
                    >
                      <ListItemIcon>
                        <Avatar
                          src={
                            classroom.avatar === null
                              ? ""
                              : `${process.env.REACT_APP_SERVER_BASE_URL}/files/${classroom.avatar}`
                          }
                          sx={
                            classroom.avatar === null
                              ? {
                                  backgroundColor: "#1967d2",
                                }
                              : {}
                          }
                        >
                          {classroom.avatar === null
                            ? `${classroom.name.toUpperCase()[0]}`
                            : ""}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText primary={classroom.name} />
                    </ListItemButton>
                  ))}
              </List>
            </Collapse>
          </List>
        </>
      ) : (
        <></>
      )}
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
      <div className="show-create-application-icon-tab">
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleCreateClick}>
            <ListItemIcon>
              <AddOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Create or join a class" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={toggleDrawer(anchor, false)}>
            <ListItemIcon>
              <AppsOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Applications" />
          </ListItemButton>
        </ListItem>
      </div>
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
          zIndex: "10",
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
              style={{ marginLeft: "10px", textDecoration: "none" }}
              to={`${classRoom ? "/home-page" : "/"}`}
              className="home-page-logo"
            >
              Learners
            </Link>
          </div>
        </Grid>
        <Grid item>
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
          >
            {/* Start Button create class */}
            <div className="show-create-application-icon">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                {/* CreateClass */}
                {classRoom ? (
                  ""
                ) : (
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
                )}

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
            </div>
            {/* End Button create class */}
            <p className="userInfo-default-screen">
              {fullName ? `${fullName}` : ""}
            </p>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
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

            <MenuItem onClick={handleOpenDialogJoin}>
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

          {/* Dialog Join Class */}
          <FormDialogJoinClass
            open={openDialogJoinClass}
            handleClose={handleCloseDialogJoin}
          />
        </Grid>
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
