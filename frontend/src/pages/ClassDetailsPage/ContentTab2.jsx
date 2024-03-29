import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import CreateExercise from "../../components/CreateExercise/CreateExercise";
import { useSelector } from "react-redux";
import SeeExercise from "../../components/SeeExercise/SeeExercise";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
const ContentTab2 = ({ loadingClassDetails, ClassDetailsSuccess }) => {
  const { language } = useContext(DataContext);
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  return (
    <>
      {loadingClassDetails ? (
        <></>
      ) : ClassDetailsSuccess ? (
        people.find(
          (element) =>
            element.email ===
              JSON.parse(localStorage.getItem("userInfo")).email &&
            element.role === "teacher"
        ) !== undefined ? (
          <CreateExercise />
        ) : (
          <SeeExercise />
        )
      ) : (
        <div
          style={{
            paddingTop: "105px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "20px",
          }}
        >
          <p>
            {language === "English" ? "Class not found" : "Không tìm thấy lớp"}
          </p>
          <Link to="/home-page">
            <Button variant="contained">
              {language === "English" ? "Return to class" : "Quay lại lớp học"}
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ContentTab2;
