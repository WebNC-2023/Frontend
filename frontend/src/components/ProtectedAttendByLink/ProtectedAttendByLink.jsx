import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { Outlet, Navigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import Axios from "../../redux/APIs/Axios";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";
import { useParams } from "react-router-dom";
const ProtectedAttendByLink = () => {
  const { setShowSidebar } = useContext(DataContext);
  const dispatch = useDispatch();
  const [loadingHomePage, setLoadingHomePage] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const { classId } = useParams();
  useEffect(() => {
    const checkLoggedIn = async () => {
      dispatch(
        updateClassroomDetailsPendingUrl({
          pendingUrl: null,
          success: false,
        })
      );
      setLoadingHomePage(true);
      setIsAuth(false);

      try {
        const res = await Axios.get("/auth/me");
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        dispatch(
          update({
            fullName: `${res.data.data.firstName} ${res.data.data.lastName}`,
            avatar:
              res.data.data.avatar === null
                ? null
                : `${
                    process.env.REACT_APP_SERVER_BASE_URL ??
                    "https://webnc-2023.vercel.app"
                  }/files/${res.data.data.avatar}?${Date.now()}`,
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
        setShowSidebar(true);
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
          dispatch(
            updateClassroomDetailsPendingUrl({
              pendingUrl: `/classes/${classId}/attend`,
              success: false,
            })
          );

          setLoadingHomePage(false);
          setIsAuth(false);
        } else {
          throw err;
        }
      }
    };

    checkLoggedIn();
  }, [dispatch, setShowSidebar, classId]);

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

export default ProtectedAttendByLink;
