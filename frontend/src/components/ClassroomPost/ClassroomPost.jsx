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
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ClassroomComment from "../ClassroomComment/ClassroomComment";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/Reducers/ClassroomCommentSlice";
import { useRef } from "react";
import { useEffect } from "react";
const ClassroomPost = ({ post }) => {
  const myRef = useRef(null);
  const [formats, setFormats] = useState(() => []);
  const [focusForm, setFocusForm] = useState(false);
  const [content, setContent] = useState("");
  const fullName = useSelector((state) => state.fullNameUser.fullName);
  const comments = useSelector((state) => state.classroomComment.comments);
  useEffect(() => {
    console.log(post.postContent);
    myRef.current.innerHTML = post.postContent;
  }, [post.postContent]);
  const handleFormat = (event, newFormats) => {
    setFormats(newFormats);
  };
  const handleFocusForm = () => {
    setFocusForm(true);
  };
  const handleBlurForm = () => {
    setFocusForm(false);
  };
  const dispatch = useDispatch();
  const handleClickSendComment = () => {
    let present = new Date();
    dispatch(
      update({
        postId: post.postId,
        commentId: comments.length,
        username: fullName,
        dateSubmitted: `${present.getDate()} thg ${
          present.getMonth() + 1
        }, ${present.getFullYear()}`,
        avatar: `${process.env.REACT_APP_SERVER_BASE_URL}/files/${
          JSON.parse(localStorage.getItem("userInfo")).avatar
        }?${Date.now()}`,
        commentContent: content,
        boldStyle: formats.includes("bold"),
        italicStyle: formats.includes("italic"),
        underlineStyle: formats.includes("underlined"),
      })
    );
    setContent("");
    setFormats([]);
    setFocusForm(false);
  };
  return (
    <>
      <div className="content-classroom-post">
        <div className="classroom-post-info">
          <div className="classroom-post-info-left">
            <Avatar
              src={post.avatar}
              sx={{ backgroundColor: "#a0c3ff", color: "#4374e0" }}
            />
            <div className="classroom-post-info-user">
              <div className="classroom-post-username">Huu Thien</div>
              <div className="classroom-post-date">{post.dateSubmitted}</div>
            </div>
          </div>
          <MoreVertIcon />
        </div>
        <div className="classroom-post-content" ref={myRef}></div>
      </div>
      <div className="comment-classroom-post-container">
        <div className="numbers-of-comment-classroom">
          {comments.filter((comment) => comment.postId === post.postId)
            .length === 0 ? (
            <></>
          ) : (
            <>
              <GroupOutlinedIcon />
              <p>
                {
                  comments.filter((comment) => comment.postId === post.postId)
                    .length
                }{" "}
                nhận xét về lớp học
              </p>
            </>
          )}
        </div>
        {comments
          .filter((comment) => comment.postId === post.postId)
          .map((comment, index) => (
            <ClassroomComment key={index} comment={comment} />
          ))}
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
              value={content}
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
            <div>
              <IconButton
                style={content === "" ? {} : { color: "#1967d2" }}
                disabled={content === "" ? true : false}
                onClick={handleClickSendComment}
              >
                <SendIcon />
              </IconButton>
            </div>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default ClassroomPost;
