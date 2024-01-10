import { useContext, useEffect, useState } from "react";
import AccountManagement from "../../components/AccountManagement/AccountManagement";
import AdminTabs from "../../components/ClassTabs/AdminTabs";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import "./AdminPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import ClassroomManagement from "../../components/ClassroomManagement/ClassroomManagement";
import { DataContext } from "../../contexts/DataContext";
const AdminPage = () => {
  const { language } = useContext(DataContext);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loadingPage, setLoadingPage] = useState(true);
  const navigate = useNavigate();
  const Tab = searchParams.get("tab");
  const [tabAdmin, setTabAdmin] = useState(() => {
    if (Number(Tab) === 1) return "one";
    else if (Number(Tab) === 2) return "two";
    else return "error";
  });
  useEffect(() => {
    if (Tab) {
      if (Number(Tab) === 1 || Number(Tab) === 2) {
        setLoadingPage(false);
      } else {
        navigate("/404*");
      }
    } else {
      navigate("/404*");
    }
  }, [Tab, navigate]);
  if (loadingPage) {
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  return (
    <>
      <HomePageHeader showSidebar={false} classRoom={true} />
      <AdminTabs tabAdmin={tabAdmin} setTabAdmin={setTabAdmin} />
      <div className="admin-page">
        <div className="admin-page-flex">
          <div className="admin-page-container">
            {Number(Tab) === 1 ? (
              <>
                <p
                  style={{
                    width: "100%",
                    padding: "16px 16px 24px",
                    borderBottom: "1px solid #4285f4",
                    color: "#1967d2",
                    fontSize: "1.875rem",
                    lineHeight: "2.25rem",
                  }}
                >
                  {language === "English"
                    ? "Accounts management"
                    : "Quản lí tài khoản"}
                </p>
                <div style={{ padding: "24px 0px" }}>
                  <AccountManagement />
                </div>
              </>
            ) : (
              <>
                <p
                  style={{
                    width: "100%",
                    padding: "16px 16px 24px",
                    borderBottom: "1px solid #4285f4",
                    color: "#1967d2",
                    fontSize: "1.875rem",
                    lineHeight: "2.25rem",
                  }}
                >
                  {language === "English"
                    ? "Classes management"
                    : "Quản lí lớp học"}
                </p>
                <div style={{ padding: "24px 0px" }}>
                  <ClassroomManagement />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
