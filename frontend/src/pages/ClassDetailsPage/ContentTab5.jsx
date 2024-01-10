import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import TableGrade from "../../components/TableGrade/TableGrade";
import "./ContentTab5.css";
import { useSelector } from "react-redux";

const ContentTab5 = ({ loadingClassDetails, ClassDetailsSuccess }) => {
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  return (
    <>
      {loadingClassDetails ? (
        <></>
      ) : ClassDetailsSuccess &&
        people.find(
          (element) =>
            element.email ===
              JSON.parse(localStorage.getItem("userInfo")).email &&
            element.role === "teacher"
        ) ? (
        <div className="classroom-details-grade-container">
          <div className="classroom-details-grade-flex">
            <TableGrade />
          </div>
        </div>
      ) : (
        <div
          style={{
            paddingTop: "105px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "20px",
          }}
        >
          <p>Không tìm thấy lớp</p>
          <Link to="/home-page">
            <Button variant="contained">Quay lại lớp học</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ContentTab5;
