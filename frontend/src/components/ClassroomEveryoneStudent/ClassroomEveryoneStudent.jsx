import { Avatar } from "@mui/material";
import "../ClassroomEveryoneTeacher/ClassroomEveryoneTeacher.css";
const ClassroomEveryoneStudent = ({ firstName, lastName, avatar, email }) => {
  return (
    <div
      style={{
        padding: "20px",
        display: "flex",
        alignItems: "center",
        columnGap: "15px",
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Avatar
        src={avatar}
        sx={
          firstName === null && lastName === null
            ? {
                width: 35,
                height: 35,
                backgroundColor: "#dcdcdc",
                color: "#b2b2b2",
              }
            : {
                width: 35,
                height: 35,
                backgroundColor: "#a0c3ff",
                color: "#4374e0",
              }
        }
      />
      <div
        className="classroom-everyone-teacher-name"
        style={
          firstName === null && lastName === null
            ? {
                color: "#959799",
              }
            : {}
        }
      >
        {firstName === null && lastName === null
          ? `${email}  (Đã được mời)`
          : `${firstName} ${lastName}`}
      </div>
    </div>
  );
};

export default ClassroomEveryoneStudent;
