import ClassTabs from "../../components/ClassTabs/ClassTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
const ClassroomExercisesPage = () => {
  const { showSidebar, contentClassTab } = useContext(DataContext);
  return (
    <>
      <HomePageHeader showSidebar={showSidebar} classRoom={true} />
      <ClassTabs contentClassTab={contentClassTab} />
    </>
  );
};

export default ClassroomExercisesPage;
