import "./HomePage.css";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Courses from "../../components/Courses/Courses";
import { DataContext } from "../../contexts/DataContext";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import EditProfile from "../../components/EditProfile/EditProfile";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
const HomePage = () => {
  const navigate = useNavigate();
  const [loadingHomePage, setLoadingHomPage] = useState(true);
  const { showScreen, setShowScreen, setFullName, setAvatarURL } = useContext(DataContext);
  useEffect(() => {
    async function checkLoggedIn() {
      setLoadingHomPage(true);
      const res = await axios({
        url: "https://webnc-2023.vercel.app/auth/me",
        method: "GET",
        withCredentials: true,
      });
      return res;
    }
    checkLoggedIn()
      .then((res) => {
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
        setFullName(`${res.data.data.firstName} ${res.data.data.lastName}`);
        setAvatarURL(`https://webnc-2023.vercel.app/files/${res.data.data.avatar}`);
        setLoadingHomPage(false);
      })
      .catch((err) => {
        if (err.response.data.message === "Unauthorized") {
          localStorage.removeItem("userInfo");
          setFullName(" ");
          setAvatarURL("");
          navigate("/");
        }
      });
  }, [navigate, setFullName, setAvatarURL]);
  useEffect(() => {
    setShowScreen("courses");
  }, [setShowScreen]);
  if (loadingHomePage)
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  else
    return (
      <div className="home-page-container">
        <HomePageHeader />
        {showScreen === "courses" ? (
          <Courses />
        ) : showScreen === "edit profile" ? (
          <EditProfile setAvatarURL={setAvatarURL} />
        ) : (
          <ChangePassword />
        )}
      </div>
    );
};

export default HomePage;
