import { useSelector } from "react-redux";
import InviteTeacherToClassroom from "../../components/InviteTeacherToClassroom/InviteTeacherToClassroom";
import ClassroomEveryoneTeacher from "../../components/ClassroomEveryoneTeacher/ClassroomEveryoneTeacher";
import InviteStudentToClassroom from "../../components/InviteStudentToClassroom/InviteStudentToClassroom";
import ClassroomEveryoneStudent from "../../components/ClassroomEveryoneStudent/ClassroomEveryoneStudent";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./ContentTab3.css";
const ContentTab3 = ({ loadingClassDetails, ClassDetailsSuccess }) => {
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  const isOwner = useSelector((state) => state.classroomDetailsInfo.isOwner);
  return (
    <>
      {loadingClassDetails ? (
        <></>
      ) : ClassDetailsSuccess ? (
        <>
          <div className="classroom-everyone-page-container">
            <div className="classroom-everyone-teacher-header">
              <p
                style={{
                  color: "#1967d2",
                }}
              >
                Giáo viên
              </p>
              {people.filter(
                (element) =>
                  element.email ===
                    JSON.parse(localStorage.getItem("userInfo")).email &&
                  element.id !== undefined &&
                  element.role === "teacher"
              ).length === 1 ? (
                <InviteTeacherToClassroom />
              ) : (
                <></>
              )}
            </div>
            {people
              .filter((element) => element.role === "teacher")
              .map((teacher, index) => (
                <ClassroomEveryoneTeacher
                  key={index}
                  userId={teacher.id ?? null}
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
                  {people.filter(
                    (element) =>
                      element.role === "student" && element.id !== undefined
                  ).length > 0
                    ? `${
                        people.filter(
                          (element) =>
                            element.role === "student" &&
                            element.id !== undefined
                        ).length
                      } sinh viên`
                    : ""}
                </div>
              )}
              {people.filter(
                (element) =>
                  element.email ===
                    JSON.parse(localStorage.getItem("userInfo")).email &&
                  element.id !== undefined &&
                  element.role === "teacher"
              ).length === 1 ? (
                <InviteStudentToClassroom />
              ) : (
                <></>
              )}
            </div>
            {people
              .filter((element) => element.role === "student")
              .map((student, index) => (
                <ClassroomEveryoneStudent
                  key={index}
                  email={student.email}
                  userId={student.id ?? null}
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

export default ContentTab3;
