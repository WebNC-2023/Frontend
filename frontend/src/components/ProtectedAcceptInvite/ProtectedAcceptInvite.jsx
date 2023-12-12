import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";
import { updateClassroomName } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { toast } from "react-toastify";
const ProtectedAcceptInvite = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loadingAcceptInvitePage, setLoadingAcceptInvitePage] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get("classId");
  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoadingAcceptInvitePage(true);
      setIsAuth(false);
      dispatch(
        updateClassroomDetailsPendingUrl({
          pendingUrl: null,
          success: false,
        })
      );
      try {
        await Axios.get("/auth/me");
        const res = await Axios.get(`/classes/${classId}/find`);
        dispatch(
          updateClassroomName({
            name: res.data.data.name,
          })
        );
        dispatch(
          updateClassroomDetailsPendingUrl({
            pendingUrl: null,
            success: true,
          })
        );
        console.log(res.data);
        setLoadingAcceptInvitePage(false);
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
              pendingUrl: `/accept-invite?classId=${classId}`,
              success: false,
            })
          );
          navigate("/login");
        } else if (err?.response?.data?.message === "Class not found") {
          navigate("/404*");
        } else {
          toast.error(`${err}`);
          setLoadingAcceptInvitePage(false);
          setIsAuth(false);
        }
      }
    };

    checkLoggedIn();
  }, [dispatch, classId, navigate]);

  if (loadingAcceptInvitePage) {
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else {
    if (isAuth && localStorage.getItem("userInfo")) return children;
    else return <Navigate to="/login" />;
  }
};

export default ProtectedAcceptInvite;
