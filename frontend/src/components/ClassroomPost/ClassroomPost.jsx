import { Avatar, Tooltip, IconButton } from "@mui/material";
import "./ClassroomPost.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import ClassroomComment from "../ClassroomComment/ClassroomComment";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../redux/Reducers/ClassroomCommentSlice";
import parser from "html-react-parser";
import TipTap from "../TipTap/TipTap";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const ClassroomPost = ({ post }) => {
  const [contentMsg, setContentMsg] = useState("");
  const [toggleComments, setToggleComments] = useState(false);
  const fullName = useSelector((state) => state.fullNameUser.fullName);
  const comments = useSelector((state) => state.classroomComment.comments);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleToggleComments = () => {
    setToggleComments((prev) => !prev);
  };
  const handleClickSendComment = () => {
    let present = new Date();
    let gmt7Time = new Date(present.getTime() + 7 * 60 * 60 * 1000);
    dispatch(
      update({
        postId: post.postId,
        commentId: comments.length,
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
        commentContent: contentMsg,
      })
    );
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
          <IconButton
            onClick={handleClick}
            style={
              open ? { backgroundColor: "#d7d7d7" } : { cursor: "pointer" }
            }
          >
            <MoreVertIcon />
          </IconButton>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              "aria-labelledby": "demo-customized-button",
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <MenuItem
              sx={{ color: "#222222", fontSize: "0.875rem" }}
              onClick={handleClose}
              disableRipple
            >
              Xóa
            </MenuItem>
          </StyledMenu>
        </div>
        <div className="classroom-post-content">{parser(post.postContent)}</div>
      </div>
      <div className="comment-classroom-post-container">
        <div className="numbers-of-comment-classroom">
          {comments.filter((comment) => comment.postId === post.postId)
            .length === 0 ? (
            <></>
          ) : (
            <div className="total-comments-btn" onClick={handleToggleComments}>
              <GroupOutlinedIcon />
              <p>
                {
                  comments.filter((comment) => comment.postId === post.postId)
                    .length
                }{" "}
                nhận xét về lớp học
              </p>
            </div>
          )}
        </div>
        {toggleComments ? (
          comments
            .filter((comment) => comment.postId === post.postId)
            .map((comment, index) => (
              <ClassroomComment key={index} comment={comment} />
            ))
        ) : (
          <></>
        )}
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
            <TipTap
              setContentMsg={setContentMsg}
              placeholderTipTap="Thêm nhận xét trong lớp học..."
            />
          </div>
          <Tooltip title="Đăng">
            <div style={{ cursor: "pointer" }} className="send-comment-btn">
              <IconButton
                style={
                  contentMsg === "" || contentMsg === "<p></p>"
                    ? {}
                    : { color: "#1967d2" }
                }
                disabled={
                  contentMsg === "" || contentMsg === "<p></p>" ? true : false
                }
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
