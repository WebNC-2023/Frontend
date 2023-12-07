import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import EditProfile from "../../components/EditProfile/EditProfile";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
const EditProfilePage = () => {
    const {showSidebar} = useContext(DataContext);
  return (
    <div className="home-page-container">
      <HomePageHeader showSidebar={showSidebar}/>
      <EditProfile />
    </div>
  );
};

export default EditProfilePage;
