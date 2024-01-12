import { Avatar } from "@mui/material";
import "./ClassroomComment.css";
import parser from "html-react-parser";
const ClassroomComment = ({ comment }) => {
  return (
    <div className="classroom-comment-container">
      <Avatar
        src={comment.avatar}
        sx={{
          backgroundColor: "#a0c3ff",
          width: 35,
          height: 35,
          color: "#4374e0",
        }}
      />
      <div className="classroom-comment-info">
        <span className="classroom-comment-info-username">
          {comment.username}
        </span>
        <span className="classroom-comment-info-date">
          {comment.dateSubmitted}
        </span>
        <div className="classroom-comment-info-content">
          {parser(comment.commentContent)}
        </div>
      </div>
    </div>
  );
};

export default ClassroomComment;
