import ClassDetailsName from "../../components/ClassDetailsName/ClassDetailsName";
import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
import "./ClassDetailsPage.css";
import NotificationInClassroom from "../../components/NotificationInClassroom/NotificationInClassroom";
import ClassroomPost from "../../components/ClassroomPost/ClassroomPost";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const ClassDetailsPage = () => {
  const { showSidebar, contentClassTab } = useContext(DataContext);
  const posts = useSelector((state) => state.classroomPost.posts);
  const successClassDetails = useSelector(
    (state) => state.classroomDetailsPending.success
  );
  return (
    <>
      <HomePageHeader showSidebar={showSidebar} classRoom={true} />
      {successClassDetails ? (
        <>
          <ClassTabs contentClassTab={contentClassTab} />
          <div className="class-details-page-container">
            <ClassDetailsName />
            <NotificationInClassroom />
            {posts.slice(1).map((post, index) => (
              <ClassroomPost key={index} post={post} />
            ))}
          </div>
        </>
      ) : (
        <div
          style={{
            paddingTop: "105px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "20px",
          }}
        >
          <p>Không tìm thấy lớp</p>
          <Link to="/home-page">
            <Button variant="contained">Quay lại lớp học</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ClassDetailsPage;
