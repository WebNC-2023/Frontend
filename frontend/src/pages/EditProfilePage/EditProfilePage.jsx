import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import EditProfile from "../../components/EditProfile/EditProfile";
const EditProfilePage = () => {
  return (
    <div className="home-page-container">
      <HomePageHeader showSidebar={false} />
      <EditProfile />
    </div>
  );
};

export default EditProfilePage;
