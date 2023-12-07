import "./HomePage.css";
import { useContext } from "react";
import Courses from "../../components/Courses/Courses";
import { DataContext } from "../../contexts/DataContext";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
const HomePage = () => {
  const { showSidebar } = useContext(DataContext);
  return (
    <div className="home-page-container">
      <HomePageHeader showSidebar={showSidebar}/>
      <Courses />
    </div>
  );
};

export default HomePage;
