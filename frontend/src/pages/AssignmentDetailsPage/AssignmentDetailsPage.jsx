import { useContext, useMemo } from "react";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import "./AssignmentDetailsPage.css";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import IconButton from "@mui/material/IconButton";
import parser from "html-react-parser";
import { useSelector } from "react-redux";
import ReviewRequirementByStudent from "../../components/ReviewRequirementByStudent/ReviewRequirementByStudent";
import { DataContext } from "../../contexts/DataContext";
const AssignmentDetailsPage = () => {
  const { language } = useContext(DataContext);
  const assignmentDetail = useSelector(
    (state) => state.classroomDetailsInfo.assignmentDetail
  );
  const dateCreated = useMemo(() => {
    function convertTime(old) {
      let newTime = new Date(old);
      newTime.setHours(newTime.getHours() + 7);
      let hour = newTime.getUTCHours();
      let minute = newTime.getUTCMinutes();
      let sec = newTime.getUTCSeconds();
      let day = newTime.getUTCDate();
      let month = newTime.getUTCMonth() + 1;
      let year = newTime.getUTCFullYear();
      if (language === "English") {
        return `${month.toString().padStart(2, "0")}/${day
          .toString()
          .padStart(2, "0")}/${year}, ${hour
          .toString()
          .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${sec
          .toString()
          .padStart(2, "0")}`;
      } else
        return `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}:${sec.toString().padStart(2, "0")}, ${day
          .toString()
          .padStart(2, "0")} thg ${month.toString().padStart(2, "0")} ${year}`;
    }
    return convertTime(assignmentDetail.assignmentDateCreated);
  }, [assignmentDetail.assignmentDateCreated, language]);
  return (
    <>
      <HomePageHeader showSidebar={true} classRoom={true} />
      <div className="assignment-details-page">
        <div className="assignment-details-page-container">
          <div className="assignment-details-content-left">
            <div className="assignment-details-content-icon">
              <IconButton
                sx={{
                  backgroundColor: "#4285f4",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#4285f4" },
                }}
              >
                <AssignmentOutlinedIcon />
              </IconButton>
            </div>
            <div className="assignment-details-content-main">
              <p
                style={{
                  color: "#1967d2",
                  fontSize: "1.875rem",
                  lineHeight: "2.25rem",
                  paddingBottom: "16px",
                }}
              >
                {assignmentDetail.assignmentTitle}
              </p>
              <p
                style={{
                  color: "#5f6368",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  paddingBottom: "16px",
                }}
              >
                {language === "English"
                  ? `The assignment is created at ${dateCreated}`
                  : `Bài tập được tạo vào lúc ${dateCreated}`}
              </p>
              <p
                style={{
                  color: "#3c4043",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #4285f4",
                  fontWeight: "500",
                }}
              >
                {assignmentDetail.score === undefined
                  ? (language === "English" ? "100 points" : "100 điểm")
                  : `${assignmentDetail.score}/100`}
                {assignmentDetail.reviewId !== undefined
                  ? (language === "English" ? " (Submitted a request for grade review)" : " (Đã gửi yêu cầu xem xét lại điểm)")
                  : ""}
              </p>
              <div
                className="assignment-details-content-instruction"
                style={{
                  padding: "16px 0px",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  borderBottom: "2px solid #e8eaed",
                  color: "#3c4043",
                  marginBottom: "16px",
                }}
              >
                {parser(assignmentDetail.assignmentDescription)}
              </div>
              {assignmentDetail.score !== undefined ? (
                <ReviewRequirementByStudent />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentDetailsPage;
