import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
const ClassroomEveryonePage = () => {
  const { showSidebar, contentClassTab } = useContext(DataContext);
  return (
    <>
      <HomePageHeader showSidebar={showSidebar} />
      <ClassTabs contentClassTab={contentClassTab} />
    </>
  );
};

export default ClassroomEveryonePage;
