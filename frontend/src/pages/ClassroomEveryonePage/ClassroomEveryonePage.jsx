import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
import "./ClassroomEveryonePage.css";
import ClassroomEveryoneTeacher from "../../components/ClassroomEveryoneTeacher/ClassroomEveryoneTeacher";
import InviteToClassroom from "../../components/InviteToClassroom/InviteToClassroom";
const ClassroomEveryonePage = () => {
  const { showSidebar, contentClassTab } = useContext(DataContext);

  return (
    <>
      <HomePageHeader showSidebar={showSidebar} classRoom={true} />
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
          <div className="classroom-everyone-student-total">2 sinh viên</div>
          <InviteToClassroom />
        </div>
        <ClassroomEveryoneTeacher />
        <ClassroomEveryoneTeacher />
      </div>
    </>
  );
};

export default ClassroomEveryonePage;
