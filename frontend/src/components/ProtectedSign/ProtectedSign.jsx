import { useEffect, useState } from "react";
//import axios from "axios";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { Outlet, Navigate, useNavigate } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";
const ProtectedSign = () => {
  const dispatch = useDispatch();
  const [loadingSignPage, setLoadingSignPage] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function checkLoggedIn() {
      setLoadingSignPage(true);
      setIsAuth(false);
      const res = await Axios({
        url: "/auth/me",
        method: "GET",
      });
      return res;
    }
    checkLoggedIn()
      .then((res) => {
        if (res.data.data.email === "learners.admin@gmail.com") {
          navigate("/admin?tab=1");
        } else {
          localStorage.removeItem("userInfo");
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );
          setLoadingSignPage(false);
          setIsAuth(true);
        }
      })
      .catch((err) => {
        if (err?.response?.data === "Unauthorized") {
          localStorage.removeItem("userInfo");
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );
          setLoadingSignPage(false);
          setIsAuth(false);
        } else {
          throw err;
        }
      });
  }, [dispatch, navigate]);
  if (loadingSignPage)
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  return isAuth ? <Navigate to="/home-page" /> : <Outlet />;
};

export default ProtectedSign;
