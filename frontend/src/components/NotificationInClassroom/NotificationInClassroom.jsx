import { Avatar } from "@mui/material";
import "./NotificationInClassroom.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { Grid, Button, ToggleButton, ToggleButtonGroup } from "@mui/material";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
const NotificationInClassroom = () => {
  const [showWriteNotification, setShowWriteNotification] = useState(false);
  const [content, setContent] = useState("");
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
