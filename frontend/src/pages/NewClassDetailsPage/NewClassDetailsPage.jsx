import { useState, useEffect } from "react";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import ClassTabs from "../../components/ClassTabs/ClassTabs";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import ContentTab1 from "../ClassDetailsPage/ContentTab1";
import { useSelector } from "react-redux";
import ContentTab2 from "../ClassDetailsPage/ContentTab2";
import ContentTab3 from "../ClassDetailsPage/ContentTab3";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
const NewClassDetailsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loadingClassDetails, setLoadingClassDetails] = useState(true);
  const { classId } = useParams();
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoadingClassDetails(true);
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
        setLoadingClassDetails(false);
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
          setLoadingClassDetails(false);
        } else {
          toast.error(`${err}`);
          setLoadingClassDetails(false);
        }
      }
    };
    checkLoggedIn();
  }, [dispatch, classId, navigate]);
  const ClassDetailsSuccess = useSelector(
    (state) => state.classroomDetailsPending.success
  );
  const Tab = searchParams.get("tab");
  const [tab, setTab] = useState(() => {
    if (Number(Tab) === 1) return "one";
    else if (Number(Tab) === 2) return "two";
    else if (Number(Tab) === 3) return "three";
    else return "error";
  });
  return (
    <>
      <HomePageHeader showSidebar={true} classRoom={true} />
      {tab === "error" ? <></> : <ClassTabs tab={tab} setTab={setTab} />}
      {loadingClassDetails && (
        <Box sx={{ width: "100%", paddingTop: "2px" }}>
          <LinearProgress />
        </Box>
      )}
      {Number(Tab) === 1 ? (
        <ContentTab1
          loadingClassDetails={loadingClassDetails}
          ClassDetailsSuccess={ClassDetailsSuccess}
        />
      ) : Number(Tab) === 2 ? (
        <ContentTab2
          loadingClassDetails={loadingClassDetails}
          ClassDetailsSuccess={ClassDetailsSuccess}
        />
      ) : Number(Tab) === 3 ? (
        <ContentTab3
          loadingClassDetails={loadingClassDetails}
          ClassDetailsSuccess={ClassDetailsSuccess}
        />
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

export default NewClassDetailsPage;
