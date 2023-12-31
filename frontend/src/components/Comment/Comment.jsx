import { Avatar } from "@mui/material";
import "./Comment.css";
const Comment = ({ commentBackgroundColor }) => {
  return (
    <div
      className="comment-container"
      style={{
        backgroundColor: commentBackgroundColor,
      }}
    >
      <Avatar
        sx={{
          backgroundColor: "#a0c3ff",
          width: 35,
          height: 35,
          color: "#4374e0",
        }}
      />
      <div>
        <span
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            color: "#3c4043",
            fontWeight: "500",
            wordBreak: "break-word",
          }}
        >
          Hữu Thiện
        </span>
        <span
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            color: "#5f6368",
            paddingLeft: "8px",
            wordBreak: "break-word"
          }}
        >
          16:56:00 30 thg 12, 2023
        </span>
        <p
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            color: "#3c4043",
            wordBreak: "break-word"
          }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur
          excepturi dignissimos tempore architecto, ullam eligendi nesciunt
          atque id molestiae repellendus minus soluta quae aliquam porro odio
          laborum amet est rerum!
        </p>
      </div>
    </div>
  );
};

export default Comment;
