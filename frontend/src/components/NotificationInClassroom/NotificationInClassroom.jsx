import { Avatar } from "@mui/material";
import "./NotificationInClassroom.css";
import { useState } from "react";
import { Grid, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/Reducers/ClassroomPostSlice";
import TipTap from "../TipTap/TipTap";
const NotificationInClassroom = () => {
  const fullName = useSelector((state) => state.fullNameUser.fullName);
  const [showWriteNotification, setShowWriteNotification] = useState(false);
  const [contentMsg, setContentMsg] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.classroomPost.posts);
  const handleShowWriteNotification = () => {
    setShowWriteNotification(true);
  };
  const handleClickCancel = () => {
    setContentMsg("");
    setShowWriteNotification(false);
  };
  const handleClickPostNotification = () => {
    let present = new Date();
    let gmt7Time = new Date(present.getTime() + 7 * 60 * 60 * 1000);
    dispatch(
      update({
        postId: posts.length,
        username: fullName,
        dateSubmitted: `${
          gmt7Time.getUTCHours().toString().length === 1
            ? "0" + gmt7Time.getUTCHours().toString()
            : gmt7Time.getUTCHours().toString()
        }:${
          gmt7Time.getUTCMinutes().toString().length === 1
            ? "0" + gmt7Time.getUTCMinutes().toString()
            : gmt7Time.getUTCMinutes().toString()
        }:${
          gmt7Time.getUTCSeconds().toString().length === 1
            ? "0" + gmt7Time.getUTCSeconds().toString()
            : gmt7Time.getUTCSeconds().toString()
        } ${gmt7Time.getUTCDate()} thg ${
          gmt7Time.getUTCMonth() + 1
        }, ${gmt7Time.getUTCFullYear()}`,
        avatar:
          JSON.parse(localStorage.getItem("userInfo")).avatar === null
            ? ""
            : `${process.env.REACT_APP_SERVER_BASE_URL}/files/${
                JSON.parse(localStorage.getItem("userInfo")).avatar
              }?${Date.now()}`,
        postContent: contentMsg,
      })
    );
    setContentMsg("");
    setShowWriteNotification(false);
  };
  return (
    <>
      {showWriteNotification ? (
        <div className="write-notification-for-classroom">
          <TipTap
            setContentMsg={setContentMsg}
            placeholderTipTap="Thông báo nội dung nào đó cho lớp học của bạn"
            content={contentMsg}
          />
          <Grid
            container
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ marginTop: "20px" }}
          >
            <Grid item>
              <Button onClick={handleClickCancel} variant="text">
                Huỷ
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={
                  contentMsg === "" || contentMsg === "<p></p>" ? true : false
                }
                onClick={handleClickPostNotification}
              >
                Đăng
              </Button>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div
          className="notification-for-classroom"
          onClick={handleShowWriteNotification}
        >
          <Avatar sx={{ backgroundColor: "#5175e0" }} />
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              userSelect: "none",
            }}
          >
            Thông báo nội dung nào đó cho lớp học của bạn
          </p>
        </div>
      )}
    </>
  );
};

export default NotificationInClassroom;
