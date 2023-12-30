import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./ContentTab4.css";
import ReviewRequirement from "../../components/ReviewRequirement/ReviewRequirement";
const ContentTab4 = ({ loadingClassDetails, ClassDetailsSuccess }) => {
  return (
    <>
      {loadingClassDetails ? (
        <></>
      ) : ClassDetailsSuccess ? (
        <div className="classroom-details-grade-container">
          <div className="classroom-details-grade-flex">
            <div className="classroom-details-grade-requirement-title">
              Yêu cầu xem xét điểm sinh viên
            </div>
            <ReviewRequirement />
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
