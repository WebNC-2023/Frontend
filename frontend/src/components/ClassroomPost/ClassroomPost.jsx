import {
  Avatar,
  Tooltip,
  IconButton,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import "./ClassroomPost.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import { useState } from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
const ClassroomPost = () => {
  const [formats, setFormats] = useState(() => []);
  const [focusForm, setFocusForm] = useState(false);
  const [content, setContent] = useState("");
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  const handleFocusForm = () => {
    setFocusForm(true);
  };
  const handleBlurForm = () => {
    setFocusForm(false);
  };
  return (
    <>
      <div className="content-classroom-post">
        <div className="classroom-post-info">
          <div className="classroom-post-info-left">
            <Avatar sx={{ backgroundColor: "#a0c3ff", color: "#4374e0" }} />
            <div className="classroom-post-info-user">
              <div className="classroom-post-username">Huu Thien</div>
              <div className="classroom-post-date">
                17 thg 12, 2021 (Đã chỉnh sửa 16 thg 1, 2022)
              </div>
            </div>
          </div>
          <MoreVertIcon />
        </div>
        <div className="classroom-post-content">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum sunt
          eveniet explicabo? Nulla eum sit delectus dolores officia obcaecati
          consequatur minus, dolore eaque nobis numquam, qui, asperiores enim
          est corporis!
        </div>
      </div>
      <div className="comment-classroom-post">
        <Avatar
          sx={{
            backgroundColor: "#a0c3ff",
            width: 35,
            height: 35,
            color: "#4374e0",
          }}
        />
        <div className="add-comment-in-post-container">
          <TextareaAutosize
            className="add-comment-in-post"
            placeholder="Thêm nhận xét trong lớp học..."
            onFocus={handleFocusForm}
            onChange={(e) => {
              setContent(e.target.value);
              if (e.target.value === "") handleBlurForm();
              else handleFocusForm();
            }}
            spellCheck="false"
            style={{
              fontWeight: formats.includes("bold") ? "bold" : "normal",
              fontStyle: formats.includes("italic") ? "italic" : "normal",
              textDecoration: formats.includes("underlined")
                ? "underline"
                : "none",
            }}
          />
          {focusForm ? (
            <ToggleButtonGroup
              sx={{ paddingTop: "10px" }}
              value={formats}
              onChange={handleFormat}
            >
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
          ) : (
            <></>
          )}
        </div>
        <Tooltip title="Đăng">
          <IconButton
            style={content === "" ? {} : { color: "#1967d2" }}
            disabled={content === "" ? true : false}
          >
            <SendIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};

export default ClassroomPost;
