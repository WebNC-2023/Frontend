import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Axios from "../../redux/APIs/Axios";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
const ClassroomExercisesPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingClassroomExercisePage, setLoadingClassroomExercisePage] =
    useState(true);
  const { classId } = useParams();
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoadingClassroomExercisePage(true);
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
            assignments: res.data.data.assignments,
            reviews: res.data.data.reviews,
          })
        );
        dispatch(
          updateClassroomDetailsPendingUrl({
            pendingUrl: null,
            success: true,
          })
        );
        setLoadingClassroomExercisePage(false);
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
          setLoadingClassroomExercisePage(false);
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
  return (
    <>
      <HomePageHeader showSidebar={true} classRoom={true} />
      <ClassTabs contentClassTab={"two"} />
      {loadingClassroomExercisePage && (
        <Box sx={{ width: "100%", paddingTop: "2px" }}>
          <LinearProgress />
        </Box>
      )}
      {loadingClassroomExercisePage ? (
        <></>
      ) : successClassDetails ? (
        <></>
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
