import ClassDetailsName from "../../components/ClassDetailsName/ClassDetailsName";
import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
import "./ClassDetailsPage.css";
import NotificationInClassroom from "../../components/NotificationInClassroom/NotificationInClassroom";
const ClassDetailsPage = () => {
  const { showSidebar, contentClassTab } = useContext(DataContext);
  return (
    <>
      <HomePageHeader showSidebar={showSidebar} classRoom={true}/>
      <ClassTabs contentClassTab={contentClassTab} />
      <div className="class-details-page-container">
        <ClassDetailsName />
        <NotificationInClassroom />
      </div>
    </>
  );
};

export default ClassDetailsPage;
