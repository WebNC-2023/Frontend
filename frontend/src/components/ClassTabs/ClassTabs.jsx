import { Tabs, Tab } from "@mui/material";
import "./ClassTabs.css";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

const ClassTabs = ({ tab, setTab }) => {
  const { people } = useSelector((state) => state.classroomDetailsInfo);
  const {language} = useContext(DataContext);
  const navigate = useNavigate();
  const { classId } = useParams();
  // const handleChange = (event, newValue) => {
  //   if (newValue === "two") navigate(`/class-details/${classId}/exercises`);
  //   else if (newValue === "one") {
  //     navigate(`/class-details/${classId}`);
  //   } else if (newValue === "three") {
  //     navigate(`/class-details/${classId}/everyone`);
  //   }
  // };
  const handleChange = (event, newValue) => {
    if (newValue === "two") {
      setTab("two");
      navigate(`/class-details/${classId}?tab=2`);
    } else if (newValue === "one") {
      setTab("one");
      navigate(`/class-details/${classId}?tab=1`);
    } else if (newValue === "three") {
      setTab("three");
      navigate(`/class-details/${classId}?tab=3`);
    } else if (newValue === "four") {
      setTab("four");
      navigate(`/class-details/${classId}?tab=4`);
    } else if (newValue === "five") {
      setTab("five");
      navigate(`/class-details/${classId}?tab=5`);
    }
  };
  return (
    <Tabs
      value={tab}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="secondary tabs example"
      className="tabs-class-container"
      variant="scrollable"
      scrollButtons="auto"
      allowScrollButtonsMobile
    >
      <Tab
        style={{
          textTransform: "none",
          color: "#5f6368",
          fontSize: "1rem",
        }}
        value="one"
        label={language === "English" ? "News" : "Bảng tin"}
      />
      <Tab
        style={{
          textTransform: "none",
          color: "#5f6368",
          fontSize: "1rem",
        }}
        value="two"
        label={language === "English" ? "Classroom assignments" : "Bài tập trên lớp"}
      />
      <Tab
        style={{
          textTransform: "none",
          color: "#5f6368",
          fontSize: "1rem",
        }}
        value="three"
        label={language === "English" ? "Everybody" : "Mọi người"}
      />
      {people.find(
        (element) =>
          element.email ===
            JSON.parse(localStorage.getItem("userInfo")).email &&
          element.role === "teacher"
      ) && (
        <Tab
          style={{
            textTransform: "none",
            color: "#5f6368",
            fontSize: "1rem",
          }}
          value="four"
          label={language === "English" ? "Grade review requests" : "Xem xét lại điểm"}
        />
      )}

      {people.find(
        (element) =>
          element.email ===
            JSON.parse(localStorage.getItem("userInfo")).email &&
          element.role === "teacher"
      ) && (
        <Tab
          style={{
            textTransform: "none",
            color: "#5f6368",
            fontSize: "1rem",
          }}
          value="five"
          label={language === "English" ? "Scores" : "Điểm"}
        />
      )}
    </Tabs>
  );
};

export default ClassTabs;
