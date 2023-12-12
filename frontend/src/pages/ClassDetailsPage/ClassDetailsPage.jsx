import ClassDetailsName from "../../components/ClassDetailsName/ClassDetailsName";
import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { useState, useEffect } from "react";
import "./ClassDetailsPage.css";
import NotificationInClassroom from "../../components/NotificationInClassroom/NotificationInClassroom";
import ClassroomPost from "../../components/ClassroomPost/ClassroomPost";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import Axios from "../../redux/APIs/Axios";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
const ClassDetailsPage = () => {
  const posts = useSelector((state) => state.classroomPost.posts);
  const successClassDetails = useSelector(
    (state) => state.classroomDetailsPending.success
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingHomePage, setLoadingHomePage] = useState(true);
  const { classId } = useParams();
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoadingHomePage(true);
      try {
        const res = await Axios.get(`/classes/${classId}`);
        dispatch(
          update({
            fullName: `${
              JSON.parse(localStorage.getItem("userInfo"))
                ? JSON.parse(localStorage.getItem("userInfo")).firstName ?? ""
                : ""
            } ${
              JSON.parse(localStorage.getItem("userInfo"))
                ? JSON.parse(localStorage.getItem("userInfo")).lastName ?? ""
                : ""
            }`,
            avatar: !JSON.parse(localStorage.getItem("userInfo"))
              ? null
              : JSON.parse(localStorage.getItem("userInfo")).avatar === null
              ? null
              : `${
                  process.env.REACT_APP_SERVER_BASE_URL ??
                  "https://webnc-2023.vercel.app"
                }/files/${
                  JSON.parse(localStorage.getItem("userInfo")).avatar
                }?${Date.now()}`,
          })
        );
        dispatch(
          updateClassroomDetailsInfo({
            name: res.data.data.name,
            topic: res.data.data.topic,
            room: res.data.data.room,
            isOwner: res.data.data.isOwner,
            people: res.data.data.people,
            owner: res.data.data.owner,
          })
        );
        dispatch(
          updateClassroomDetailsPendingUrl({
            pendingUrl: null,
            success: true,
          })
        );
        setLoadingHomePage(false);
      } catch (err) {
        if (err?.response?.data === "Unauthorized") {
          localStorage.removeItem("userInfo");
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );
          dispatch(
            updateClassroomDetailsPendingUrl({
              pendingUrl: null,
              success: false,
            })
          );
          navigate("/login");
        } else if (err?.response?.data?.message === "Class not found") {
          dispatch(
            update({
              fullName: `${
                JSON.parse(localStorage.getItem("userInfo")).firstName ?? ""
              } ${JSON.parse(localStorage.getItem("userInfo")).lastName ?? ""}`,
              avatar:
                JSON.parse(localStorage.getItem("userInfo")).avatar === null
                  ? null
                  : `${
                      process.env.REACT_APP_SERVER_BASE_URL ??
                      "https://webnc-2023.vercel.app"
                    }/files/${
                      JSON.parse(localStorage.getItem("userInfo")).avatar
                    }?${Date.now()}`,
            })
          );
          dispatch(
            updateClassroomDetailsPendingUrl({
              pendingUrl: null,
              success: false,
            })
          );
          setLoadingHomePage(false);
        } else {
          throw err;
        }
      }
    };
    checkLoggedIn();
  }, [dispatch, classId, navigate]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  return (
    <>
      <HomePageHeader showSidebar={true} classRoom={true} />
      <ClassTabs contentClassTab="one" />
      {loadingHomePage && (
        <Box sx={{ width: "100%", paddingTop: "2px" }}>
          <LinearProgress />
        </Box>
      )}
      {loadingHomePage ? (
        <></>
      ) : successClassDetails ? (
        <>
          <div className="class-details-page-container">
            <div className="class-details-page-flex">
              <div
                className="class-details-page-left"
                style={
                  people.filter(
                    (element) =>
                      element.email ===
                        JSON.parse(localStorage.getItem("userInfo")).email &&
                      element.role === "teacher"
                  ).length === 0
                    ? {
                        display: "none",
                      }
                    : {}
                }
              >
                <div className="class-details-page-left-code">
                  <div className="class-details-page-code-title">Mã lớp</div>
                  <div className="class-details-page-code-content">qjvbhnk</div>
                </div>
                <IconButton size="large" onClick={handleClick}>
                  <MoreVertIcon
                    sx={{
                      color: "#202020",
                    }}
                  />
                </IconButton>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      display: "flex",
                      columnGap: "30px",
                    }}
                  >
                    <LinkIcon />
                    <p>Sao chép đường liên kết mời tham gia lớp học</p>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      display: "flex",
                      columnGap: "30px",
                    }}
                  >
                    <ContentCopyRoundedIcon />
                    <p>Sao chép mã lớp</p>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      display: "flex",
                      columnGap: "30px",
                    }}
                  >
                    <RestartAltIcon />
                    <p>Đặt lại mã lớp</p>
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    sx={{
                      display: "flex",
                      columnGap: "30px",
                    }}
                  >
                    <CancelPresentationIcon />
                    <p>Tắt</p>
                  </MenuItem>
                </Menu>
              </div>
              <div
                className="class-details-page-right"
                style={
                  people.filter(
                    (element) =>
                      element.email ===
                        JSON.parse(localStorage.getItem("userInfo")).email &&
                      element.role === "teacher"
                  ).length === 0
                    ? {
                        width: "calc(100% - 25px)",
                      }
                    : {}
                }
              >
                <ClassDetailsName />
                <NotificationInClassroom />
                {posts.slice(1).map((post, index) => (
                  <ClassroomPost key={index} post={post} />
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          style={{
            paddingTop: "105px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "20px",
          }}
        >
          <p>Không tìm thấy lớp</p>
          <Link to="/home-page">
            <Button variant="contained">Quay lại lớp học</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ClassDetailsPage;
