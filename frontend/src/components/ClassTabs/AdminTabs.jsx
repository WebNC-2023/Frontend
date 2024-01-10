import { Tabs, Tab } from "@mui/material";
import "./ClassTabs.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";

const AdminTabs = ({ tabAdmin, setTabAdmin }) => {
  const { language } = useContext(DataContext);
  const navigate = useNavigate();
  const handleChange = (event, newValue) => {
    if (newValue === "two") {
      setTabAdmin("two");
      navigate("/admin?tab=2");
    } else if (newValue === "one") {
      setTabAdmin("one");
      navigate("/admin?tab=1");
    }
  };
  return (
    <Tabs
      value={tabAdmin}
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
        label={language === "English" ? "Accounts" : "Tài khoản"}
      />
      <Tab
        style={{
          textTransform: "none",
          color: "#5f6368",
          fontSize: "1rem",
        }}
        value="two"
        label={language === "English" ? "Classes" : "Lớp học"}
      />
    </Tabs>
  );
};

export default AdminTabs;
