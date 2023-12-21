import { Avatar } from "@mui/material";
import "./NotificationInClassroom.css";
import { useState } from "react";
//import TextField from "@mui/material/TextField";
import { Grid, Button } from "@mui/material";
// import FormatBoldIcon from "@mui/icons-material/FormatBold";
// import FormatItalicIcon from "@mui/icons-material/FormatItalic";
// import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/Reducers/ClassroomPostSlice";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const NotificationInClassroom = () => {
  const fullName = useSelector((state) => state.fullNameUser.fullName);
  const [showWriteNotification, setShowWriteNotification] = useState(false);
  const toolbarOptions = [
    ["bold", "italic", "underline"], // toggled buttons
    [{ list: "bullet" }], // dropdowns with defaults from theme
  ];
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.classroomPost.posts);
  const handleShowWriteNotification = () => {
    setShowWriteNotification(true);
  };
  const handleClickCancel = () => {
    setContent("");
    setShowWriteNotification(false);
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
        avatar:
          JSON.parse(localStorage.getItem("userInfo")).avatar === null
            ? ""
            : `${process.env.REACT_APP_SERVER_BASE_URL}/files/${
                JSON.parse(localStorage.getItem("userInfo")).avatar
              }?${Date.now()}`,
        postContent: content,
      })
    );
    setContent("");
    setShowWriteNotification(false);
  };
  return (
    <>
      {showWriteNotification ? (
        <div className="write-notification-for-classroom">
          {/* <ToggleButtonGroup value={formats} onChange={handleFormat}>
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
          /> */}
          <ReactQuill
            style={{
              width: "100%",
              color: "black",
            }}
            theme="snow"
            value={content}
            onChange={(e) => setContent(e)}
            modules={{ toolbar: toolbarOptions }}
            placeholder="Thông báo nội dung nào đó cho
            lớp học của bạn"
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
                  content === "" || content === "<p><br></p>" ? true : false
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
