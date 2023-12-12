import { Tabs, Tab } from "@mui/material";
import "./ClassTabs.css";
//import { useNavigate, useParams } from "react-router-dom";

const ClassTabs = ({ tab, setTab }) => {
  // const navigate = useNavigate();
  // const { classId } = useParams();
  // const handleChange = (event, newValue) => {
  //   if (newValue === "two") navigate(`/class-details/${classId}/exercises`);
  //   else if (newValue === "one") {
  //     navigate(`/class-details/${classId}`);
  //   } else if (newValue === "three") {
  //     navigate(`/class-details/${classId}/everyone`);
  //   }
  // };
  const handleChange = (event, newValue) => {
    if (newValue === "two") setTab("two");
    else if (newValue === "one") {
      setTab("one");
    } else if (newValue === "three") {
      setTab("three");
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
      <Tab value="one" label="Bảng tin" />
      <Tab value="two" label="Bài tập trên lớp" />
      <Tab value="three" label="Mọi người" />
    </Tabs>
  );
};

export default ClassTabs;
