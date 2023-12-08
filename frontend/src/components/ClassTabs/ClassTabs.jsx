import { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import "./ClassTabs.css";

const ClassTabs = () => {
  const [value, setValue] = useState("one");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        className="class-tabs"
      >
        <Tab value="one" label="Item One" />
        <Tab value="two" label="Item Two" />
        <Tab value="three" label="Item Three" />
      </Tabs>
    </Box>
  );
};

export default ClassTabs;
