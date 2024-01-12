import { useEffect, useState } from "react";
//import axios from "axios";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { Outlet } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";
import { toast } from "react-toastify";
const ProtectedLanding = () => {
  const dispatch = useDispatch();
  const [loadingLandingPage, setLoadingLandingPage] = useState(true);
  useEffect(() => {
    async function checkLoggedIn() {
      setLoadingLandingPage(true);
      const res = await Axios({
        url: "/auth/me",
        method: "GET",
      });
      return res;
    }
    checkLoggedIn()
      .then((res) => {
        localStorage.setItem("userInfo", JSON.stringify(res.data.data));
        dispatch(
          update({
            fullName: `${res.data.data.firstName} ${res.data.data.lastName}`,
            avatar: `${process.env.REACT_APP_SERVER_BASE_URL}/files/${
              res.data.data.avatar
            }?${Date.now()}`,
          })
        );
        setLoadingLandingPage(false);
      })
      .catch((err) => {
        if (
          err?.response?.data === "Unauthorized" ||
          err.response.status === 401
        ) {
          localStorage.removeItem("userInfo");
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );
          setLoadingLandingPage(false);
        } else {
          toast.error(`${err}`, { autoClose: 3000 });
        }
      });
  }, [dispatch]);
  if (loadingLandingPage)
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  return <Outlet />;
};

export default ProtectedLanding;
