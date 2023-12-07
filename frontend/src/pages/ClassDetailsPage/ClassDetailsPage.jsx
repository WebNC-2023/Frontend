import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
const ClassDetailsPage = () => {
  const { showSidebar } = useContext(DataContext);
  return <HomePageHeader showSidebar={showSidebar} />;
};

export default ClassDetailsPage;
