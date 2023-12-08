import "./ClassDetailsName.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip, IconButton } from "@mui/material";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
const ClassDetailsName = () => {
  const [showInfo, setShowInfo] = useState(false);
  const handleClickShowInfo = () => {
    setShowInfo(!showInfo);
  };
  return (
    <>
      <div
        className="class-details-name-header"
        style={
          showInfo
            ? {
                borderBottomLeftRadius: "none",
                borderBottomRightRadius: "none",
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px"
              }
            : {
                borderRadius: "10px",
                marginBottom: "25px"
              }
        }
      >
        <div className="class-details-name-title">
          Môi Trường Đại cương - 20DTV
        </div>
        <Tooltip
          title={showInfo ? "Ẩn thông tin về lớp" : "Hiện thông tin về lớp"}
        >
          <IconButton onClick={handleClickShowInfo}>
            {showInfo ? (
              <InfoIcon style={{ color: "white" }} />
            ) : (
              <InfoOutlinedIcon style={{ color: "white" }} />
            )}
          </IconButton>
        </Tooltip>
      </div>
      {showInfo ? (
        <div className="class-details-name-header-more" style={showInfo ? {
            marginBottom: "25px"
        }: {

        }}>
            <p className="class-details-name-header-more-content">Chủ đề: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, voluptas ipsa. Harum ratione delectus cumque minus. Voluptatibus assumenda incidunt sunt ipsum delectus. Quos quidem quasi nam illo, unde fugiat nemo.</p>
            <p className="class-details-name-header-more-content">Phòng: Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, voluptas ipsa. Harum ratione delectus cumque minus. Voluptatibus assumenda incidunt sunt ipsum delectus. Quos quidem quasi nam illo, unde fugiat nemo.</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ClassDetailsName;
