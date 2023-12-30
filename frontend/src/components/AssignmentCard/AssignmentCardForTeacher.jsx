import "./AssignmentCardForTeacher.css";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import IconButton from "@mui/material/IconButton";
//import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import parser from "html-react-parser";
import { useNavigate } from "react-router-dom";
const AssignmentCardForTeacher = ({
  assignment_title,
  assignment_published,
  assignment_instruction,
  assignment_score,
}) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClickViewInstruction = () => {
    navigate("/assignment-details/sadsadsad");
  };
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
            Đã đăng vào {assignment_published}
          </span>
          {/* <IconButton sx={{}}>
            <MoreVertIcon />
          </IconButton> */}
        </div>
      </div>
      {show && (
        <div className="assignment-card-for-teacher-details">
          <p
            style={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              color: "#3c4043",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            {assignment_score} điểm
          </p>
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
          <div style={{ display: "flex" }}>
            <p
              className="teacher-view-instruction"
              onClick={handleClickViewInstruction}
            >
              Xem hướng dẫn
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignmentCardForTeacher;
