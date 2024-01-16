import "./HomePageHeader.css";
import {
  Grid,
  Box,
  Avatar,
  Button,
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
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import InputIcon from "@mui/icons-material/Input";
import FormDialogCreateClass from "../FormDialog/FormDialogCreateClass";
import FormDialogJoinClass from "../FormDialog/FormDialogJoinClass";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import SourceOutlinedIcon from "@mui/icons-material/SourceOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import Fade from "@mui/material/Fade";
import CheckIcon from "@mui/icons-material/Check";
import * as userApi from "../../redux/APIs/userServices";
import {
  getNotification,
  markAllAsRead,
  markAsRead,
} from "../../redux/APIs/notificationServices";
import moment from "moment";
import { DataContext } from "../../contexts/DataContext";

const HomePageHeader = ({ showSidebar, classRoom }) => {
  const { language, setLanguage } = useContext(DataContext);
  const avatarImg = useSelector((state) => state.fullNameUser.avatar);
  const fullName = useSelector((state) => state.fullNameUser.fullName);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [classAnchorEl, setClassAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filterUnread, setFilterUnread] = useState(false);
  const [ws, setWs] = useState(null);

  const [openDialogCreateClass, setOpenDialogCreateClass] = useState(false);
  const [openDialogJoinClass, setOpenDialogJoinClass] = useState(false);
  const openMenuClass = Boolean(classAnchorEl);
  const open = Boolean(anchorEl);
  const openNotification = Boolean(notificationAnchorEl);

  const [languagesAnchorEl, setLanguagesAnchorEl] = useState(null);
  const openLanguages = Boolean(languagesAnchorEl);
  const handleClickLanguages = (event) => {
    setLanguagesAnchorEl(event.currentTarget);
  };
  const handleCloseLanguages = () => {
    setLanguagesAnchorEl(null);
  };

  const getNotificationData = async () => {
    const res = await getNotification();
    setNotifications(res.data);
  };

  const handleChangeVietnamese = () => {
    setLanguage("Tiếng Việt");
    localStorage.setItem("language", "Tiếng Việt");
    setLanguagesAnchorEl(null);
  };

  const handleChangeEnglish = () => {
    setLanguage("English");
    localStorage.setItem("language", "English");
    setLanguagesAnchorEl(null);
  };

  const calculateTimeAgo = (date) => {
    const now = moment();
    const targetDate = moment(date);

    const duration = moment.duration(now.diff(targetDate));

    if (duration.asSeconds() < 60) {
      return `${Math.floor(duration.asSeconds())}s ago`;
    } else if (duration.asMinutes() < 60) {
      return `${Math.floor(duration.asMinutes())}m ago`;
    } else if (duration.asHours() < 24) {
      return `${Math.floor(duration.asHours())}h ago`;
    } else {
      return targetDate.format("MMM D, YYYY [at] h:mm A");
    }
  };

  const configWS = async () => {
    const newWs = new WebSocket(
      `${
        process.env.REACT_APP_SOCKET_SERVER_URL
      }?access_token=${localStorage.getItem("accessToken")}`
    );

    newWs.onmessage = () => {
      getNotificationData();
    };

    setWs(newWs);
  };

  React.useEffect(() => {
    getNotificationData();
    configWS();
  }, []);

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
  const handleCloseNotification = () => {
    setNotificationAnchorEl(null);
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
    if (language === "English") {
      if (text === "Home screen") {
        setState({ ...state, [anchor]: false });
        navigate("/home-page");
      } else setState({ ...state, [anchor]: false });
    } else {
      if (text === "Màn hình chính") {
        setState({ ...state, [anchor]: false });
        navigate("/home-page");
      } else setState({ ...state, [anchor]: false });
    }
  };
  const classes = useSelector((state) => state.classes.classes);
  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {(language === "English"
          ? ["Home screen", "Calendar"]
          : ["Màn hình chính", "Lịch"]
        ).map((text, index) => (
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
              <ListItemText
                primary={language === "English" ? "Teach" : "Giảng dạy"}
              />
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
                  <ListItemText
                    primary={
                      language === "English"
                        ? "Need to consider"
                        : "Cần xem xét"
                    }
                  />
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
              <ListItemText
                primary={language === "English" ? "Registered" : "Đã đăng ký"}
              />
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
                  <ListItemText
                    primary={
                      language === "English" ? "What to do" : "Việc cần làm"
                    }
                  />
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
        {(language === "English"
          ? ["Archived classes", "Install"]
          : ["Lớp học đã lưu trữ", "Cài đặt"]
        ).map((text, index) => (
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
            <ListItemText
              primary={
                language === "English"
                  ? "Create or join a class"
                  : "Tạo hoặc tham gia lớp học"
              }
            />
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
              <Tooltip
                title={language === "English" ? "Main menu" : "Trình đơn chính"}
              >
                <IconButton onClick={toggleDrawer("left", true)}>
                  <MenuIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <></>
            )}

            <Link
              style={{ marginLeft: "10px", textDecoration: "none" }}
              to={`${
                classRoom
                  ? JSON.parse(localStorage.getItem("userInfo")).email ===
                    "learners.admin@gmail.com"
                    ? "/"
                    : "/home-page"
                  : "/"
              }`}
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
            spacing={1}
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
                  <Tooltip
                    title={
                      language === "English"
                        ? "Create or join a class"
                        : "Tạo hoặc tham gia lớp học"
                    }
                  >
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

                {/* Notifications */}
                <Tooltip
                  title={language === "English" ? "Notifications" : "Thông báo"}
                >
                  <IconButton
                    id="notification-icon"
                    aria-label="App"
                    sx={{ color: "#5175e0" }}
                    size="large"
                    onClick={(event) =>
                      setNotificationAnchorEl(event.currentTarget)
                    }
                  >
                    <NotificationsActiveOutlinedIcon fontSize="inherit" />
                    {notifications.filter(
                      (notification) => !notification.isRead
                    ).length !== 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "0px",
                          right: "0px",
                          fontSize: "14px",
                          padding: "3px",
                          backgroundColor: "#EB4D5E",
                          color: "white",
                          borderRadius: "10px",
                          minWidth: "20px",
                        }}
                      >
                        {
                          notifications.filter(
                            (notification) => !notification.isRead
                          ).length
                        }
                      </Box>
                    )}
                  </IconButton>
                </Tooltip>

                {/* Languages */}
                <Tooltip
                  title={language === "English" ? "Languages" : "Ngôn ngữ"}
                >
                  <IconButton
                    id="language-icon"
                    aria-label="App"
                    sx={{ color: "#5175e0" }}
                    size="large"
                    onClick={handleClickLanguages}
                  >
                    <LanguageOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={languagesAnchorEl}
                  open={openLanguages}
                  onClose={handleCloseLanguages}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={handleChangeVietnamese}
                  >
                    Tiếng Việt {language === "Tiếng Việt" && <CheckIcon />}
                  </MenuItem>
                  <MenuItem
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={handleChangeEnglish}
                  >
                    English {language === "English" && <CheckIcon />}
                  </MenuItem>
                </Menu>
              </Stack>
            </div>
            <div className="show-notification-in-mobile-view">
              <Stack
                direction="row"
                justifyContent="center"
                alignItems="center"
                spacing={1}
              >
                {/* Notifications */}
                <Tooltip
                  title={language === "English" ? "Notifications" : "Thông báo"}
                >
                  <IconButton
                    id="notification-icon"
                    aria-label="App"
                    sx={{ color: "#5175e0" }}
                    size="large"
                    onClick={(event) =>
                      setNotificationAnchorEl(event.currentTarget)
                    }
                  >
                    <NotificationsActiveOutlinedIcon fontSize="inherit" />
                    {notifications.filter(
                      (notification) => !notification.isRead
                    ).length !== 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "0px",
                          right: "0px",
                          fontSize: "14px",
                          padding: "3px",
                          backgroundColor: "#EB4D5E",
                          color: "white",
                          borderRadius: "10px",
                          minWidth: "20px",
                        }}
                      >
                        {
                          notifications.filter(
                            (notification) => !notification.isRead
                          ).length
                        }
                      </Box>
                    )}
                  </IconButton>
                </Tooltip>
                {/* Languages */}
                <Tooltip
                  title={language === "English" ? "Languages" : "Ngôn ngữ"}
                >
                  <IconButton
                    id="language-icon"
                    aria-label="App"
                    sx={{ color: "#5175e0" }}
                    size="large"
                    onClick={handleClickLanguages}
                  >
                    <LanguageOutlinedIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="fade-menu"
                  MenuListProps={{
                    "aria-labelledby": "fade-button",
                  }}
                  anchorEl={languagesAnchorEl}
                  open={openLanguages}
                  onClose={handleCloseLanguages}
                  TransitionComponent={Fade}
                >
                  <MenuItem
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={handleChangeVietnamese}
                  >
                    Tiếng Việt {language === "Tiếng Việt" && <CheckIcon />}
                  </MenuItem>
                  <MenuItem
                    sx={{ display: "flex", alignItems: "center" }}
                    onClick={handleChangeEnglish}
                  >
                    English {language === "English" && <CheckIcon />}
                  </MenuItem>
                </Menu>
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
              <Tooltip
                title={
                  language === "English" ? "My account" : "Tài khoản của tôi"
                }
              >
                <IconButton
                  onClick={handleClick}
                  size="small"
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
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
              {language === "English" ? "Create classes" : "Tạo lớp học"}
            </MenuItem>

            <MenuItem onClick={handleOpenDialogJoin}>
              <ListItemIcon>
                <InputIcon fontSize="small" sx={{ color: "#5175e0" }} />
              </ListItemIcon>
              {language === "English" ? "Join the class" : "Tham gia lớp học"}
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
              {language === "English" ? "Edit profile" : "Chỉnh sửa hồ sơ"}
            </MenuItem>
            {JSON.parse(localStorage.getItem("userInfo")) &&
              JSON.parse(localStorage.getItem("userInfo")).isSSO === false && (
                <MenuItem onClick={handleClickChangePasswordBtn}>
                  <ListItemIcon>
                    <PasswordIcon fontSize="small" sx={{ color: "#5175e0" }} />
                  </ListItemIcon>
                  {language === "English" ? "Change password" : "Đổi mật khẩu"}
                </MenuItem>
              )}
            <MenuItem onClick={handleClickLogOut}>
              <ListItemIcon>
                <Logout fontSize="small" sx={{ color: "#5175e0" }} />
              </ListItemIcon>
              {language === "English" ? "Logout" : "Đăng xuất"}
            </MenuItem>
          </Menu>

          <Menu
            anchorEl={notificationAnchorEl}
            id="notification-menu"
            open={openNotification}
            onClose={handleCloseNotification}
            PaperProps={{
              elevation: 0,
              sx: {
                width: "450px",
                maxHeight: "600px",
                overflowY: "auto",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
            <Box
              sx={{
                padding: "10px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Button
                  variant={filterUnread ? "outlined" : "contained"}
                  sx={{ marginRight: "20px" }}
                  onClick={() => setFilterUnread(false)}
                >
                  {language === "English" ? "All" : "Tất cả"}
                </Button>
                <Button
                  variant={filterUnread ? "contained" : "outlined"}
                  onClick={() => setFilterUnread(true)}
                >
                  {language === "English" ? "Unread" : "Chưa đọc"}
                </Button>
              </Box>
              <Box>
                <Button
                  variant="text"
                  onClick={async () => {
                    await markAllAsRead();
                    getNotificationData();
                  }}
                >
                  {language === "English"
                    ? "Mark all as read"
                    : "Đánh dấu tất cả là đã đọc"}
                </Button>
              </Box>
            </Box>
            {(filterUnread
              ? notifications.filter((n) => !n.isRead)
              : notifications
            ).length === 0 && (
              <MenuItem>
                <Box>
                  {language === "English"
                    ? "No notifications found"
                    : "Không có thông báo nào"}
                </Box>
              </MenuItem>
            )}
            {(filterUnread
              ? notifications.filter((n) => !n.isRead)
              : notifications
            ).map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={async () => {
                  if (!notification.isRead) {
                    await markAsRead(notification.id);
                    getNotificationData();
                  }
                  window.location.href = `${process.env.REACT_APP_CLIENT_BASE_URL}${notification.link}`;
                }}
              >
                <Avatar
                  src={
                    notification.sender.avatar !== null
                      ? `${process.env.REACT_APP_SERVER_BASE_URL}/files/${notification.sender.avatar}`
                      : ""
                  }
                  sx={{
                    width: "50px !important",
                    height: "50px !important",
                    backgroundColor: "#5175e0",
                  }}
                ></Avatar>
                <Box
                  sx={{
                    wordWrap: true,
                    width: "100%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Box sx={{ fontWeight: 400, display: "flex", gap: "4px" }}>
                    <Box sx={{ fontWeight: 500 }}>{`${
                      notification.sender.firstName ?? ""
                    } ${notification.sender.lastName ?? ""}`}</Box>
                    <Box
                      sx={{
                        flex: "1",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {notification.content}
                    </Box>
                  </Box>
                  <Box sx={{ fontSize: "14px" }}>
                    {calculateTimeAgo(notification.dateCreated)}
                  </Box>
                </Box>
                {!notification.isRead && (
                  <Box
                    sx={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "10px",
                      backgroundColor: "red",
                      marginLeft: "10px",
                      marginBottom: "25px",
                    }}
                  ></Box>
                )}
              </MenuItem>
            ))}
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
