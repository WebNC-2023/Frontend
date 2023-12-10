import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useSelector } from "react-redux";
import { useContext } from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const ClassroomExercisesPage = () => {
  const { showSidebar, contentClassTab } = useContext(DataContext);
  const successClassDetails = useSelector(
    (state) => state.classroomDetailsPending.success
  );
  return (
    <>
      <HomePageHeader showSidebar={showSidebar} classRoom={true} />
      {successClassDetails ? (
        <ClassTabs contentClassTab={contentClassTab} />
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
          <p>Không tìm thấy lớp</p>
          <Link to="/home-page">
            <Button variant="contained">Quay lại lớp học</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ClassroomExercisesPage;
