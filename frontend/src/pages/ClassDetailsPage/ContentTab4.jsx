import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./ContentTab4.css";
import ReviewRequirement from "../../components/ReviewRequirement/ReviewRequirement";
import { useSelector } from "react-redux";
import { useContext } from "react";
import { DataContext } from "../../contexts/DataContext";
const ContentTab4 = ({ loadingClassDetails, ClassDetailsSuccess }) => {
  const { language } = useContext(DataContext);
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  const reviews = useSelector((state) => state.classroomDetailsInfo.reviews);
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
            {people.find(
              (element) =>
                element.email ===
                  JSON.parse(localStorage.getItem("userInfo")).email &&
                element.role === "teacher"
            ) ? (
              <>
                <div className="classroom-details-grade-requirement-title">
                  {language === "English"
                    ? "Grade review requests"
                    : "Yêu cầu xem lại điểm sinh viên"}
                </div>
                {reviews !== undefined ? (
                  <>
                    {reviews
                      .filter((x) => x.scoreAgain === null)
                      .map((review, index) => (
                        <ReviewRequirement
                          key={index}
                          firstName={review.student.firstName}
                          lastName={review.student.lastName}
                          assignmentTitle={review.assignmentTitle}
                          currentScore={review.score}
                          expectScore={review.expectScore}
                          explanation={review.explanation}
                          reviewId={review.reviewId}
                          scoreAgain={review.scoreAgain}
                        />
                      ))}
                    {reviews
                      .filter((x) => x.scoreAgain !== null)
                      .map((review, index) => (
                        <ReviewRequirement
                          key={index}
                          firstName={review.student.firstName}
                          lastName={review.student.lastName}
                          assignmentTitle={review.assignmentTitle}
                          currentScore={review.score}
                          expectScore={review.expectScore}
                          explanation={review.explanation}
                          reviewId={review.reviewId}
                          scoreAgain={review.scoreAgain}
                        />
                      ))}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <div
                  style={{
                    paddingTop: "144px",
                    fontSize: "1.375rem",
                    textAlign: "center",
                    color: "#5f6368",
                    userSelect: "none",
                  }}
                >
                  Chỉ giáo viên mới có thể đọc được nội dung của trang này.
                </div>
              </>
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
          <p>
            {language === "English" ? "Class not found" : "Không tìm thấy lớp"}
          </p>
          <Link to="/home-page">
            <Button variant="contained">
              {language === "English" ? "Return to class" : "Quay lại lớp học"}
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ContentTab4;
