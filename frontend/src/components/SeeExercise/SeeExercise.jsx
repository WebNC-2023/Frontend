import "./SeeExercise.css";
import Button from "@mui/material/Button";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AssignmentCardForStudent from "../AssignmentCard/AssignmentCardForStudent";
import { useState } from "react";
const SeeExercise = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className="seeExercise-container">
        <div className="seeExercise-flex">
          <Button
            style={{
              backgroundColor: "#e3ecfa",
              color: "#1967d2",
              textTransform: "none",
              padding: "8px",
            }}
            startIcon={<AssignmentIndOutlinedIcon />}
            onClick={() => setShow(!show)}
          >
            {!show ? "Xem tất cả bài tập của bạn" : "Ẩn tất cả bài tập của bạn"}
          </Button>
        </div>
        {show && (
          <div className="seeExercise-flex-direction-col">
            <AssignmentCardForStudent
              assignment_title="Bài tập 1"
              assignment_published="Đã đăng vào 13:44:00 28 thg 12, 2023"
              assignment_instruction="<p>CC</p>"
              assignment_score={5}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default SeeExercise;
