import ClassDetailsName from "../../components/ClassDetailsName/ClassDetailsName";
import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
import "./ClassDetailsPage.css";
import NotificationInClassroom from "../../components/NotificationInClassroom/NotificationInClassroom";
import ClassroomPost from "../../components/ClassroomPost/ClassroomPost";
import { useSelector } from "react-redux";
const ClassDetailsPage = () => {
  const { showSidebar, contentClassTab } = useContext(DataContext);
  const posts = useSelector((state) => state.classroomPost.posts);
  return (
    <>
      <HomePageHeader showSidebar={showSidebar} classRoom={true} />
      <ClassTabs contentClassTab={contentClassTab} />
      <div className="class-details-page-container">
        <ClassDetailsName />
        <NotificationInClassroom />
        {posts.slice(1).map((post, index) => <ClassroomPost key={index} post={post}/>)}
      </div>
    </>
  );
};

export default ClassDetailsPage;
