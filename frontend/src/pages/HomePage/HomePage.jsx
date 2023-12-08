import "./HomePage.css";
import { useContext } from "react";
import Courses from "../../components/Courses/Courses";
import { DataContext } from "../../contexts/DataContext";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import JoinedClasses from "../../components/JoinedClasses/JoinedClasses";

const createdClasses = [
  {
    id: 0,
    className: "Name1",
    part: "Part1",
    topic: "Topic1",
    room: "Room1",
    owner: "User1",
  },
  {
    id: 1,
    className: "Name2",
    part: "Part2",
    topic: "Topic2",
    room: "Room2",
    owner: "User2",
  },
  {
    id: 2,
    className: "Name3",
    part: "Part3",
    topic: "Topic3",
    room: "Room3",
    owner: "User3",
  },
  {
    id: 3,
    className: "Name4",
    part: "Part4",
    topic: "Topic4",
    room: "Room4",
    owner: "User4",
  },
  {
    id: 4,
    className: "Name5",
    part: "Part5",
    topic: "Topic5",
    room: "Room5",
    owner: "User5",
  },
];

const HomePage = () => {
  const { showSidebar } = useContext(DataContext);
  return (
    <div className="home-page-container">
      <HomePageHeader showSidebar={showSidebar} />
      <ol className="joined" style={{ marginTop: "65px" }}>
        {createdClasses.map((item) => (
          <JoinedClasses classData={item} key={item.id} />
        ))}
      </ol>
    </div>
  );
};

export default HomePage;
