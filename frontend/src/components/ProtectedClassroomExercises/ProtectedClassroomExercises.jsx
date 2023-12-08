import { useEffect, useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { Outlet, Navigate } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
import Axios from "../../redux/APIs/Axios";

const ProtectedClassroomExercises = () => {
  const {setShowSidebar, setContentClassTab} = useContext(DataContext);
  const dispatch = useDispatch();
  const [loadingHomePage, setLoadingHomePage] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoadingHomePage(true);
      setIsAuth(false);

      try {
        const res = await Axios.get("/auth/me");
        console.log(res.data);

        localStorage.setItem("userInfo", JSON.stringify(res.data.data));

        dispatch(
          update({
            fullName: `${res.data.data.firstName} ${res.data.data.lastName}`,
            avatar: `${process.env.REACT_APP_SERVER_BASE_URL ?? "https://webnc-2023.vercel.app"}/files/${res.data.data.avatar}?${Date.now()}`,
          })
        );

        setLoadingHomePage(false);
        setIsAuth(true);
        setShowSidebar(true);
        setContentClassTab("two");
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
        } else {
          throw err;
        }
      }
    };

    checkLoggedIn();
  }, [dispatch, setShowSidebar, setContentClassTab]);

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
    <Navigate to="/" />
  );
};

export default ProtectedClassroomExercises;
