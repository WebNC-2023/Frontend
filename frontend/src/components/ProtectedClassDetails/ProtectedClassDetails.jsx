import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { Outlet, Navigate, useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import Axios from "../../redux/APIs/Axios";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";

const ProtectedClassDetails = () => {
  const { setShowSidebar, setContentClassTab } = useContext(DataContext);
  const dispatch = useDispatch();
  const [loadingHomePage, setLoadingHomePage] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const { classId } = useParams();

  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoadingHomePage(true);
      setIsAuth(false);
      try {
        const res = await Axios.get(`/classes/${classId}`);
        console.log(res.data);
        dispatch(
          updateClassroomDetailsInfo({
            name: res.data.data.name,
            topic: res.data.data.topic,
            room: res.data.data.room,
          })
        );
        dispatch(
          updateClassroomDetailsPendingUrl({
            pendingUrl: null,
            success: true,
          })
        );
        dispatch(
          update({
            fullName: `${
              JSON.parse(localStorage.getItem("userInfo")).firstName ?? ""
            } ${JSON.parse(localStorage.getItem("userInfo")).lastName ?? ""}`,
            avatar:
              JSON.parse(localStorage.getItem("userInfo")).avatar === null
                ? null
                : `${
                    process.env.REACT_APP_SERVER_BASE_URL ??
                    "https://webnc-2023.vercel.app"
                  }/files/${
                    JSON.parse(localStorage.getItem("userInfo")).avatar
                  }?${Date.now()}`,
          })
        );
        setLoadingHomePage(false);
        setIsAuth(true);
        setShowSidebar(true);
        setContentClassTab("one");
      } catch (err) {
        console.error(err.response);
        if (err?.response?.data === "Unauthorized") {
          localStorage.removeItem("userInfo");
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );

          setLoadingHomePage(false);
          setIsAuth(false);
          dispatch(
            updateClassroomDetailsPendingUrl({
              pendingUrl: `/class-details/${classId}`,
              success: false,
            })
          );
        } else if (err?.response?.data?.message === "Class not found") {
          dispatch(
            update({
              fullName: `${
                JSON.parse(localStorage.getItem("userInfo")).firstName ?? ""
              } ${JSON.parse(localStorage.getItem("userInfo")).lastName ?? ""}`,
              avatar:
                JSON.parse(localStorage.getItem("userInfo")).avatar === null
                  ? null
                  : `${
                      process.env.REACT_APP_SERVER_BASE_URL ??
                      "https://webnc-2023.vercel.app"
                    }/files/${
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
          setLoadingHomePage(false);
          setIsAuth(true);
        } else {
          throw err;
        }
      }
    };
    checkLoggedIn();
  }, [dispatch, setShowSidebar, setContentClassTab, classId]);

  if (loadingHomePage) {
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }

  return isAuth && localStorage.getItem("userInfo") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedClassDetails;
