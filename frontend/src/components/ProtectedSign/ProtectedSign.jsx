import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedSign = () => {
  const dispatch = useDispatch();
  const [loadingSignPage, setLoadingSignPage] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    async function checkLoggedIn() {
      setLoadingSignPage(true);
      setIsAuth(false);
      const res = await axios({
        url: "https://webnc-2023.vercel.app/auth/me",
        method: "GET",
        withCredentials: true,
      });
      return res;
    }
    checkLoggedIn()
      .then((res) => {
        console.log(res.data);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            firstName: res.data.data.firstName,
            lastName: res.data.data.lastName,
            id: res.data.data.id,
            email: res.data.data.email,
            refreshToken: res.data.data.refreshToken,
            avatar: res.data.data.avatar,
          })
        );
        dispatch(
          update({
            fullName: `${res.data.data.firstName} ${res.data.data.lastName}`,
            avatar: `https://webnc-2023.vercel.app/files/${res.data.data.avatar}`,
          })
        );
        setLoadingSignPage(false);
        setIsAuth(true);
      })
      .catch((err) => {
        if (err.response.data === "Unauthorized") {
          localStorage.removeItem("userInfo");
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );
          setLoadingSignPage(false);
          setIsAuth(false);
        }
      });
  }, [dispatch]);
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
