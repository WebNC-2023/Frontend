import { Avatar } from "@mui/material";
import "./NotificationInClassroom.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/Reducers/ClassroomPostSlice";
const NotificationInClassroom = () => {
  const fullName = useSelector((state) => state.fullNameUser.fullName);
  const [showWriteNotification, setShowWriteNotification] = useState(false);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.classroomPost.posts);
  const handleShowWriteNotification = () => {
    setShowWriteNotification(true);
  };
  const handleClickCancel = () => {
    setShowWriteNotification(false);
  };
  const [formats, setFormats] = useState(() => []);

  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  const handleClickPostNotification = () => {
    let present = new Date();
    dispatch(
      update({
        postId: posts.length,
        username: fullName,
        dateSubmitted: `${present.getDate()} thg ${
          present.getMonth() + 1
        }, ${present.getFullYear()}`,
        avatar: `${
          process.env.REACT_APP_SERVER_BASE_URL ??
          "https://webnc-2023.vercel.app"
        }/files/${
          JSON.parse(localStorage.getItem("userInfo")).avatar
        }?${Date.now()}`,
        postContent: content,
        boldStyle: formats.includes("bold"),
        italicStyle: formats.includes("italic"),
        underlineStyle: formats.includes("underlined"),
      })
    );
    setShowWriteNotification(false);
    setFormats([]);
  };
  return (
    <>
      {showWriteNotification ? (
        <div className="write-notification-for-classroom">
          <ToggleButtonGroup value={formats} onChange={handleFormat}>
            <ToggleButton value="bold" aria-label="bold">
              <FormatBoldIcon />
            </ToggleButton>
            <ToggleButton value="italic" aria-label="italic">
              <FormatItalicIcon />
            </ToggleButton>
            <ToggleButton value="underlined" aria-label="underlined">
              <FormatUnderlinedIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <TextField
            id="filled-multiline-static"
            label="Thông báo nội dung nào đó cho
            lớp học của bạn"
            multiline
            variant="filled"
            fullWidth
            autoFocus
            onChange={(e) => {
              setContent(e.target.value);
            }}
            inputProps={{
              style: {
                fontWeight: formats.includes("bold") ? "bold" : "normal",
                fontStyle: formats.includes("italic") ? "italic" : "normal",
                textDecoration: formats.includes("underlined")
                  ? "underline"
                  : "none",
              },
              spellCheck: "false",
            }}
          />
          <Grid
            container
            display={"flex"}
            justifyContent={"flex-end"}
            sx={{ marginTop: "30px" }}
          >
            <Grid item>
              <Button onClick={handleClickCancel} variant="text">
                Huỷ
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                disabled={content === "" ? true : false}
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
