import "./SeeExercise.css";
import Button from "@mui/material/Button";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
const SeeExercise = () => {
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
          >
            Xem bài tập của bạn
          </Button>
        </div>
      </div>
    </>
  );
};

export default SeeExercise;
