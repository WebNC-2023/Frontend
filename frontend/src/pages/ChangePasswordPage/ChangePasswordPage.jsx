import ChangePassword from "../../components/ChangePassword/ChangePassword";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import { DataContext } from "../../contexts/DataContext";
import { useContext } from "react";
const ChangePasswordPage = () => {
  const {showSidebar} = useContext(DataContext);
  return (
    <div className="home-page-container">
      <HomePageHeader showSidebar={showSidebar}/>
      <ChangePassword />
    </div>
  );
};

export default ChangePasswordPage;
