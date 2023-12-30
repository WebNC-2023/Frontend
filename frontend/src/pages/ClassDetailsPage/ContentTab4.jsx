import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./ContentTab4.css";
import ReviewRequirement from "../../components/ReviewRequirement/ReviewRequirement";
import { useSelector } from "react-redux";
const ContentTab4 = ({ loadingClassDetails, ClassDetailsSuccess }) => {
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  return (
    <>
      {loadingClassDetails ? (
        <></>
      ) : ClassDetailsSuccess ? (
        <div className="classroom-details-grade-container">
          <div className="classroom-details-grade-flex">
            {people.find(
              (element) =>
                element.email ===
                  JSON.parse(localStorage.getItem("userInfo")).email &&
                element.role === "teacher"
            ) ? (
              <>
                <div className="classroom-details-grade-requirement-title">
                  Yêu cầu xem xét điểm sinh viên
                </div>
                <ReviewRequirement />
              </>
            ) : (
              <div className="classroom-details-show-grade-compositions-title">
                Yêu cầu xem xét điểm sinh viên
              </div>
            )}
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

export default ContentTab4;
