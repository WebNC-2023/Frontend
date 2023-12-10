import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
import "./ClassroomEveryonePage.css";
import ClassroomEveryoneTeacher from "../../components/ClassroomEveryoneTeacher/ClassroomEveryoneTeacher";
import InviteToClassroom from "../../components/InviteToClassroom/InviteToClassroom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const ClassroomEveryonePage = () => {
  const { showSidebar, contentClassTab } = useContext(DataContext);
  const successClassDetails = useSelector(
    (state) => state.classroomDetailsPending.success
  );
  return (
    <>
      <HomePageHeader showSidebar={showSidebar} classRoom={true} />
      {successClassDetails ? (
        <>
          <ClassTabs contentClassTab={contentClassTab} />
          <div className="classroom-everyone-page-container">
            <div className="classroom-everyone-teacher-header">
              <p>Giáo viên</p>
              <InviteToClassroom />
            </div>
            <ClassroomEveryoneTeacher />
            <ClassroomEveryoneTeacher />
            <div className="classroom-everyone-student-header">
              <div className="classroom-everyone-student-title">Bạn học</div>
              <div className="classroom-everyone-student-total">
                2 sinh viên
              </div>
              <InviteToClassroom />
            </div>
            <ClassroomEveryoneTeacher />
            <ClassroomEveryoneTeacher />
          </div>
        </>
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

export default ClassroomEveryonePage;
