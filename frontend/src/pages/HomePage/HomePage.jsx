import "./HomePage.css";
import { useContext } from "react";
import Courses from "../../components/Courses/Courses";
import { DataContext } from "../../contexts/DataContext";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import EditProfile from "../../components/EditProfile/EditProfile";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
const HomePage = () => {
  const { showScreen } = useContext(DataContext);
  return (
    <div className="home-page-container">
      <HomePageHeader showScreen={showScreen}/>
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
