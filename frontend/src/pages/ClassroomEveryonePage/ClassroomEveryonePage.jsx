import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { useEffect, useState } from "react";
import "./ClassroomEveryonePage.css";
import ClassroomEveryoneTeacher from "../../components/ClassroomEveryoneTeacher/ClassroomEveryoneTeacher";
import InviteTeacherToClassroom from "../../components/InviteTeacherToClassroom/InviteTeacherToClassroom";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import InviteStudentToClassroom from "../../components/InviteStudentToClassroom/InviteStudentToClassroom";
import ClassroomEveryoneStudent from "../../components/ClassroomEveryoneStudent/ClassroomEveryoneStudent";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import Axios from "../../redux/APIs/Axios";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
const ClassroomEveryonePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingClassroomEveryonePage, setLoadingClassroomEveryonePage] =
    useState(true);
  const { classId } = useParams();
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoadingClassroomEveryonePage(true);
      try {
        const res = await Axios.get(`/classes/${classId}`);
        dispatch(
          update({
            fullName: `${
              JSON.parse(localStorage.getItem("userInfo")).firstName ?? ""
            } ${JSON.parse(localStorage.getItem("userInfo")).lastName ?? ""}`,
            avatar:
              JSON.parse(localStorage.getItem("userInfo")).avatar === null
                ? null
                : `${process.env.REACT_APP_SERVER_BASE_URL}/files/${
                    JSON.parse(localStorage.getItem("userInfo")).avatar
                  }?${Date.now()}`,
          })
        );
        dispatch(
          updateClassroomDetailsInfo({
            id: res.data.data.id,
            name: res.data.data.name,
            topic: res.data.data.topic,
            room: res.data.data.room,
            isOwner: res.data.data.isOwner,
            people: res.data.data.people,
            owner: res.data.data.owner,
            classroomAvatar: res.data.data.avatar,
          })
        );
        dispatch(
          updateClassroomDetailsPendingUrl({
            pendingUrl: null,
            success: true,
          })
        );
        setLoadingClassroomEveryonePage(false);
      } catch (err) {
        if (err?.response?.data === "Unauthorized") {
          localStorage.removeItem("userInfo");
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );
          dispatch(
            updateClassroomDetailsPendingUrl({
              pendingUrl: null,
              success: false,
            })
          );
          navigate("/login");
        } else if (err?.response?.data?.message === "Class not found") {
          dispatch(
            update({
              fullName: `${
                JSON.parse(localStorage.getItem("userInfo")).firstName ?? ""
              } ${JSON.parse(localStorage.getItem("userInfo")).lastName ?? ""}`,
              avatar:
                JSON.parse(localStorage.getItem("userInfo")).avatar === null
                  ? null
                  : `${process.env.REACT_APP_SERVER_BASE_URL}/files/${
                      JSON.parse(localStorage.getItem("userInfo")).avatar
                    }?${Date.now()}`,
            })
          );
          dispatch(
            updateClassroomDetailsPendingUrl({
              pendingUrl: null,
              success: false,
            })
          );
          setLoadingClassroomEveryonePage(false);
        } else {
          throw err;
        }
      }
    };
    checkLoggedIn();
  }, [dispatch, classId, navigate]);
  const successClassDetails = useSelector(
    (state) => state.classroomDetailsPending.success
  );
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  const isOwner = useSelector((state) => state.classroomDetailsInfo.isOwner);
  return (
    <>
      <HomePageHeader showSidebar={true} classRoom={true} />
      <ClassTabs contentClassTab={"three"} />
      {loadingClassroomEveryonePage && (
        <Box sx={{ width: "100%", paddingTop: "2px" }}>
          <LinearProgress />
        </Box>
      )}
      {loadingClassroomEveryonePage ? (
        <></>
      ) : successClassDetails ? (
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

export default ClassroomEveryonePage;
