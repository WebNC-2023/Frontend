import "./AssignmentCardForTeacher.css";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import IconButton from "@mui/material/IconButton";
import { useState, useMemo, useContext } from "react";
import Button from "@mui/material/Button";
import parser from "html-react-parser";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
const AssignmentCardForStudent = ({
  assignment_title,
  assignment_published,
  assignment_instruction,
  assignment_score,
  assignment_id,
}) => {
  const { language } = useContext(DataContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClickInstruction = () => {
    navigate(`/assignment-details/${assignment_id}`);
  };
  const dateCreated = useMemo(() => {
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
    return convertTime(assignment_published);
  }, [assignment_published, language]);
  return (
    <div style={{ paddingBottom: "8px" }}>
      <div
        className={
          !show
            ? "assignment-card-for-teacher-default"
            : "assignment-card-for-teacher"
        }
        onClick={() => setShow(!show)}
      >
        <div>
          <IconButton
            sx={{
              backgroundColor: "#4285f4",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#4285f4" },
            }}
          >
            <AssignmentOutlinedIcon />
          </IconButton>
          <span
            style={{
              color: "#3c4043",
              paddingLeft: "16px",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: "500",
              wordBreak: "break-word",
              userSelect: "none",
            }}
          >
            {assignment_title}
          </span>
        </div>
        <div>
          <span
            style={{
              fontSize: "0.75rem",
              lineHeight: "1rem",
              color: "#737373",
              paddingRight: "16px",
              userSelect: "none",
            }}
          >
            {language === "English" ? "Published on: " : "Đã đăng vào: "}
            {dateCreated}
          </span>
        </div>
      </div>
      {show && (
        <>
          <div className="assignment-card-for-student-details">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  color: "#3c4043",
                  fontWeight: "500",
                  textDecoration: "underline",
                  userSelect: "none",
                }}
              >
                {assignment_score}
                {language === "English" ? " points" : " điểm"}
              </p>
              <p
                style={{
                  color: "#2e7d32",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  fontWeight: "500",
                  userSelect: "none",
                }}
              >
                {language === "English" ? "Assigned" : "Đã giao"}
              </p>
            </div>
            <div
              style={{
                color: "#212121",
                padding: "24px 0px",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                wordBreak: "break-word",
              }}
              className="assignment-card-for-teacher-instruction"
            >
              {parser(assignment_instruction)}
            </div>
          </div>
          <div
            style={{
              padding: "16px",
              boxShadow:
                "0 1px 2px 0 rgba(60, 64, 67, .3), 0 2px 6px 2px rgba(60, 64, 67, .15)",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              clipPath: "inset(0px -10px -10px -10px)",
              border: "none",
            }}
          >
            <Button
              variant="text"
              sx={{ color: "#1967d2", textTransform: "none" }}
              onClick={handleClickInstruction}
            >
              {language === "English" ? "View details" : "Xem chi tiết"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AssignmentCardForStudent;
