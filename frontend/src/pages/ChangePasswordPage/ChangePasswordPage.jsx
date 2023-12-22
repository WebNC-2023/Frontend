import ChangePassword from "../../components/ChangePassword/ChangePassword";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
const ChangePasswordPage = () => {
  return (
    <div className="home-page-container">
      <HomePageHeader showSidebar={false} />
      <ChangePassword />
    </div>
  );
};

export default ChangePasswordPage;
