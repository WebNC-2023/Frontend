import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
import "./ClassroomEveryonePage.css";
import ClassroomEveryoneTeacher from "../../components/ClassroomEveryoneTeacher/ClassroomEveryoneTeacher";
import InviteTeacherToClassroom from "../../components/InviteTeacherToClassroom/InviteTeacherToClassroom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import InviteStudentToClassroom from "../../components/InviteStudentToClassroom/InviteStudentToClassroom";
import ClassroomEveryoneStudent from "../../components/ClassroomEveryoneStudent/ClassroomEveryoneStudent";
const ClassroomEveryonePage = () => {
  const { showSidebar, contentClassTab } = useContext(DataContext);
  const successClassDetails = useSelector(
    (state) => state.classroomDetailsPending.success
  );
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  const isOwner = useSelector((state) => state.classroomDetailsInfo.isOwner);
  return (
    <>
      <HomePageHeader showSidebar={showSidebar} classRoom={true} />
      {successClassDetails ? (
        <>
          <ClassTabs contentClassTab={contentClassTab} />
          <div className="classroom-everyone-page-container">
            <div className="classroom-everyone-teacher-header">
              <p
                style={{
                  color: "#1967d2",
                }}
              >
                Giáo viên
              </p>
              {isOwner && <InviteTeacherToClassroom />}
            </div>
            {people
              .filter((element) => element.role === "teacher")
              .map((teacher, index) => (
                <ClassroomEveryoneTeacher
                  key={index}
                  email={teacher.email}
                  firstName={teacher.firstName ?? null}
                  lastName={teacher.lastName ?? null}
                  avatar={
                    teacher.avatar === undefined
                      ? null
                      : teacher.avatar === null
                      ? null
                      : `https://webnc-2023.vercel.app/files/${
                          teacher.avatar
                        }?${Date.now()}`
                  }
                />
              ))}
            <div className="classroom-everyone-student-header">
              <div className="classroom-everyone-student-title">Bạn học</div>
              {!isOwner && (
                <div className="classroom-everyone-student-total">
                  2 sinh viên
                </div>
              )}
              {isOwner && <InviteStudentToClassroom />}
            </div>
            {people
              .filter((element) => element.role === "student")
              .map((student, index) => (
                <ClassroomEveryoneStudent
                  key={index}
                  email={student.email}
                  firstName={student.firstName ?? null}
                  lastName={student.lastName ?? null}
                  avatar={
                    student.avatar === undefined
                      ? null
                      : student.avatar === null
                      ? null
                      : `https://webnc-2023.vercel.app/files/${
                          student.avatar
                        }?${Date.now()}`
                  }
                />
              ))}
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
