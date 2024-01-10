import "./ClassDetailsName.css";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Tooltip, IconButton } from "@mui/material";
import { useContext, useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import { useSelector } from "react-redux";
import { DataContext } from "../../contexts/DataContext";
const ClassDetailsName = () => {
  const [showInfo, setShowInfo] = useState(false);
  const { language } = useContext(DataContext);
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
                backgroundSize: "100% 100%",
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
                backgroundSize: "100% 100%",
              }
        }
      >
        <div className="class-details-name-title">
          {classroomDetailsInfo.name}
        </div>
        <Tooltip
          title={
            showInfo
              ? language === "English"
                ? "Hide class information"
                : "Ẩn thông tin về lớp"
              : language === "English"
              ? "Show information about class"
              : "Hiện thông tin về lớp"
          }
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
            {language === "English" ? "Topic: " : "Chủ đề: "}
            {classroomDetailsInfo.topic}
          </p>
          <p className="class-details-name-header-more-content">
            {language === "English" ? "Room: " : "Phòng: "}
            {classroomDetailsInfo.room}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ClassDetailsName;
