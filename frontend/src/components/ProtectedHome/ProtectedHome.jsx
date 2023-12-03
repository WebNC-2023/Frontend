import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { Outlet, Navigate } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";
const ProtectedHome = () => {
  const dispatch = useDispatch();
  const [loadingHomePage, setLoadingHomePage] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    async function checkLoggedIn() {
      setLoadingHomePage(true);
      setIsAuth(false);
      const res = await Axios.get("https://webnc-2023.vercel.app/auth/me");
      return res;
    }
    checkLoggedIn()
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        dispatch(
          update({
            fullName: `${res.data.data.firstName} ${res.data.data.lastName}`,
            avatar: `https://webnc-2023.vercel.app/files/${res.data.data.avatar}`,
          })
        );
        setLoadingHomePage(false);
        setIsAuth(true);
      })
      .catch((err) => {
        console.log(err.response);
        if (err.response.data === "Unauthorized") {
          localStorage.removeItem("userInfo");
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );
          setLoadingHomePage(false);
          setIsAuth(false);
        }
      });
  }, [dispatch]);
  if (loadingHomePage)
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  return isAuth && localStorage.getItem("userInfo") ? (
    <Outlet />
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedHome;
