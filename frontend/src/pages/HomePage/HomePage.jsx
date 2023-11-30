import "./HomePage.css";
import { useContext } from "react";
//import { useNavigate } from "react-router-dom";
//import axios from "axios";
import Courses from "../../components/Courses/Courses";
import { DataContext } from "../../contexts/DataContext";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import EditProfile from "../../components/EditProfile/EditProfile";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
// import { useDispatch } from "react-redux";
// import { update } from "../../redux/Reducers/fullNameUserSlice";
const HomePage = () => {
  // const navigate = useNavigate();
  // const [loadingHomePage, setLoadingHomPage] = useState(true);
  const { showScreen } = useContext(DataContext);
  //const dispatch = useDispatch();
  // useEffect(() => {
  //   async function checkLoggedIn() {
  //     setLoadingHomPage(true);
  //     const res = await axios({
  //       url: "https://webnc-2023.vercel.app/auth/me",
  //       method: "GET",
  //       withCredentials: true,
  //     });
  //     return res;
  //   }
  //   checkLoggedIn()
  //     .then((res) => {
  //       console.log(res.data);
  //       localStorage.setItem(
  //         "userInfo",
  //         JSON.stringify({
  //           firstName: res.data.data.firstName,
  //           lastName: res.data.data.lastName,
  //           id: res.data.data.id,
  //           email: res.data.data.email,
  //           refreshToken: res.data.data.refreshToken,
  //           avatar: res.data.data.avatar,
  //         })
  //       );
  //       dispatch(update({
  //         fullName: `${res.data.data.firstName} ${res.data.data.lastName}`,
  //         avatar: `https://webnc-2023.vercel.app/files/${res.data.data.avatar}`
  //       }));
  //       setLoadingHomPage(false);
  //     })
  //     .catch((err) => {
  //       if (err.response.data === "Unauthorized") {
  //         localStorage.removeItem("userInfo");
  //         dispatch(update({
  //           fullName: " ",
  //           avatar: ""
  //         }));
  //         navigate("/");
  //       }
  //     });
  // }, [navigate, dispatch]);
  // if (loadingHomePage)
  //   return (
  //     <div className="lds-ellipsis">
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //       <div></div>
  //     </div>
  //   );
  // else
  return (
    <div className="home-page-container">
      <HomePageHeader />
      {showScreen === "courses" ? (
        <Courses />
      ) : showScreen === "edit profile" ? (
        <EditProfile />
      ) : (
        <ChangePassword />
      )}
    </div>
  );
};

export default HomePage;
