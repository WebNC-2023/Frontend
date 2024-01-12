import { Avatar } from "@mui/material";
import "./Comment.css";
import parser from "html-react-parser";
import { useContext, useMemo } from "react";
import { DataContext } from "../../contexts/DataContext";
const Comment = ({
  commentBackgroundColor,
  firstName,
  lastName,
  avatar,
  comment,
  dateCreated,
}) => {
  const { language } = useContext(DataContext);
  const timeCreated = useMemo(() => {
    function convertTime(old) {
      let newTime = new Date(old);
      newTime.setHours(newTime.getHours() + 7);
      let hour = newTime.getUTCHours();
      let minute = newTime.getUTCMinutes();
      let sec = newTime.getUTCSeconds();
      let day = newTime.getUTCDate();
      let month = newTime.getUTCMonth() + 1;
      let year = newTime.getUTCFullYear();
      if (language === "English") {
        return `${month.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}/${year}, ${hour
          .toString()
          .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${sec
          .toString()
          .padStart(2, "0")}`;
      } else
        return `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}:${sec.toString().padStart(2, "0")}, ${day
          .toString()
          .padStart(2, "0")} thg ${month.toString().padStart(2, "0")} ${year}`;
    }
    return convertTime(dateCreated);
  }, [dateCreated, language]);
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
        src={
          avatar !== null
            ? `${process.env.REACT_APP_SERVER_BASE_URL}/files/${avatar}`
            : ""
        }
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
          {firstName !== null && lastName !== null
            ? `${firstName} ${lastName}`
            : firstName === null
            ? `${lastName}`
            : `${firstName}`}
        </span>
        <span
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            color: "#5f6368",
            paddingLeft: "8px",
            wordBreak: "break-word",
          }}
        >
          {timeCreated}
        </span>
        <div
          style={{
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
            color: "#3c4043",
            wordBreak: "break-word",
          }}
          className="content-comment-in-review-request"
        >
          {parser(comment)}
        </div>
      </div>
    </div>
  );
};

export default Comment;
