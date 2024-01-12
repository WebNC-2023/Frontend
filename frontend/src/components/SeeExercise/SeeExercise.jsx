import "./SeeExercise.css";
import Button from "@mui/material/Button";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import AssignmentCardForStudent from "../AssignmentCard/AssignmentCardForStudent";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
const SeeExercise = () => {
  const {language} = useContext(DataContext);
  const assignments = useSelector(
    (state) => state.classroomDetailsInfo.assignments
  );
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
              userSelect: "none"
            }}
            startIcon={<AssignmentIndOutlinedIcon />}
            disabled
          >
            {language === "English" ? "All your assignments" : "Tất cả bài tập của bạn"}
          </Button>
        </div>
        <div className="seeExercise-flex-direction-col">
          {assignments.map((assignment, index) => (
            <AssignmentCardForStudent
              key={index}
              assignment_title={assignment.title}
              assignment_published={assignment.dateCreated}
              assignment_instruction={assignment.description}
              assignment_score={assignment.score ?? 100}
              assignment_id={assignment.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SeeExercise;
