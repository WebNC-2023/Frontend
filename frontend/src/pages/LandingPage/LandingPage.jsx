import "./LandingPage.css";
import { useContext, useEffect } from "react";
import FAQS from "../../components/FAQS/FAQS";
import Home from "../../components/Home/Home";
import LandingPageCourses from "../../components/LandingPageCourses/LandingPageCourses";
import About from "../../components/About/About";
import LandingPageHeader from "../../components/LandingPageHeader/LandingPageHeader";
import { DataContext } from "../../contexts/DataContext";
const LandingPage = () => {
  const { showSmallMenu, showContent, setShowSmallMenu, setShowContent } = useContext(DataContext);
  useEffect(() => {
    setShowSmallMenu(false);
  }, [setShowSmallMenu]);
  useEffect(() => {
    setShowContent("Home");
  }, [setShowContent]);
  return (
    <div className="landing-page-container">
      <LandingPageHeader />
      {!showSmallMenu ? (
        showContent === "Home" ? (
          <Home />
        ) : showContent === "Course" ? (
          <LandingPageCourses />
        ) : showContent === "About" ? (
          <About />
        ) : (
          <FAQS />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default LandingPage;
