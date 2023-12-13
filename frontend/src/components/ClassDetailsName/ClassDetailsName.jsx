import "./ClassDetailsName.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip, IconButton } from "@mui/material";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";
const ClassDetailsName = () => {
  const [showInfo, setShowInfo] = useState(false);
  const handleClickShowInfo = () => {
    setShowInfo(!showInfo);
  };
  const classroomDetailsInfo = useSelector(
    (state) => state.classroomDetailsInfo
  );
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
                borderTopRightRadius: "10px",
                backgroundImage:
                  classroomDetailsInfo.classroomAvatar === null
                    ? "url('https://www.gstatic.com/classroom/themes/Physics.jpg')"
                    : `url("${process.env.REACT_APP_SERVER_BASE_URL}/files/${classroomDetailsInfo.classroomAvatar}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
            : {
                borderRadius: "10px",
                marginBottom: "25px",
                backgroundImage:
                  classroomDetailsInfo.classroomAvatar === null
                    ? "url('https://www.gstatic.com/classroom/themes/Physics.jpg')"
                    : `url("${process.env.REACT_APP_SERVER_BASE_URL}/files/${classroomDetailsInfo.classroomAvatar}")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }
        }
      >
        <div className="class-details-name-title">
          {classroomDetailsInfo.name}
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
        <div
          className="class-details-name-header-more"
          style={
            showInfo
              ? {
                  marginBottom: "25px",
                }
              : {}
          }
        >
          <p className="class-details-name-header-more-content">
            Chủ đề: {classroomDetailsInfo.topic}
          </p>
          <p className="class-details-name-header-more-content">
            Phòng: {classroomDetailsInfo.room}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ClassDetailsName;
