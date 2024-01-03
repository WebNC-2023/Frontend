import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";
import { toast } from "react-toastify";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";
const ProtectedHome = () => {
  const dispatch = useDispatch();
  const [loadingHomePage, setLoadingHomePage] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoadingHomePage(true);
      setIsAuth(false);
      dispatch(
        updateClassroomDetailsPendingUrl({
          pendingUrl: null,
          success: true,
        })
      );
      try {
        const res = await Axios.get("/auth/me");
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));

        dispatch(
          update({
            fullName: `${res.data.data.firstName} ${res.data.data.lastName}`,
            avatar:
              res.data.data.avatar === null
                ? null
                : `${process.env.REACT_APP_SERVER_BASE_URL}/files/${
                    res.data.data.avatar
                  }?${Date.now()}`,
          })
        );
        dispatch(
          updateClassroomDetailsPendingUrl({
            pendingUrl: null,
            success: true,
          })
        );
        setLoadingHomePage(false);
        setIsAuth(true);
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
              pendingUrl: null,
              success: true,
            })
          );
          navigate("/login");
        } else {
          toast.error(`${err}`);
          setLoadingHomePage(false);
          setIsAuth(false);
        }
      }
    };

    checkLoggedIn();
  }, [dispatch, navigate]);

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

export default ProtectedHome;
