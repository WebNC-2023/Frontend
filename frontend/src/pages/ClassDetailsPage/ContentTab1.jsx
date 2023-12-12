import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LinkIcon from "@mui/icons-material/Link";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import ClassDetailsName from "../../components/ClassDetailsName/ClassDetailsName";
import NotificationInClassroom from "../../components/NotificationInClassroom/NotificationInClassroom";
import ClassroomPost from "../../components/ClassroomPost/ClassroomPost";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./ClassDetailsPage.css";
const ContentTab1 = ({ loadingClassDetails, ClassDetailsSuccess }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  const posts = useSelector((state) => state.classroomPost.posts);
  return (
    <>
      {loadingClassDetails ? (
        <></>
      ) : ClassDetailsSuccess ? (
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

export default ContentTab1;
