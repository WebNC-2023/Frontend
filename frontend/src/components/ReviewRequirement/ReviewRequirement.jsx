import "./ReviewRequirement.css";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
// import TipTap from "../TipTap/TipTap";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// import { isNaN } from "formik";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";
// import Axios from "../../redux/APIs/Axios";
const ReviewRequirement = ({
  firstName,
  lastName,
  assignmentTitle,
  currentScore,
  expectScore,
  explanation,
  reviewId,
  scoreAgain,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  // const [contentMsg, setContentMsg] = useState("");
  // const [grade, setGrade] = useState(0);
  // const [open, setOpen] = useState(false);
  // const [sending, setSending] = useState(false);
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const handleSendCommentByTeacher = () => {
  //   async function sendCommentByTeacher() {
  //     setSending(true);
  //     try {
  //       const res1 = await Axios({
  //         method: "POST",
  //         url: `/scores/reviews/${reviewId}/comments`,
  //         data: {
  //           comment: contentMsg,
  //         },
  //       });
  //       const res2 = await Axios({
  //         method: "GET",
  //         url: `scores/reviews/${reviewId}`,
  //       });
  //       console.log("res1", res1.data);

  //       setSending(false);
  //     } catch (error) {
  //       console.log(error);
  //       setSending(false);
  //     }
  //   }
  //   sendCommentByTeacher();
  // };
  const handleClickViewDetails = () => {
    navigate(`/review-details/${reviewId}`);
  };
  return (
    <>
      <div
        className={
          !showDetails
            ? "review-requirement-container"
            : "review-requirement-container-showDetails"
        }
        onClick={() => setShowDetails(!showDetails)}
      >
        <IconButton
          sx={
            scoreAgain === null
              ? {
                  backgroundColor: "#4285f4",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#4285f4" },
                }
              : {
                  backgroundColor: "#727272",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#727272" },
                }
          }
        >
          <ReviewsOutlinedIcon
            sx={{ fontSize: { xs: 16, sm: 20, md: 24, lg: 28 } }}
          />
        </IconButton>
        <div>
          <p
            style={{
              color: "#3c4043",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: "500",
              wordBreak: "break-word",
            }}
          >
            {firstName !== null && lastName !== null
              ? `${firstName} ${lastName} đã đăng một yêu cầu xem xét lại điểm cho bài tập: ${assignmentTitle}`
              : firstName === null
              ? `${lastName} đã đăng một yêu cầu xem xét lại điểm cho bài tập: ${assignmentTitle}`
              : `${firstName} đã đăng một yêu cầu xem xét lại điểm cho bài tập: ${assignmentTitle}`}
          </p>
        </div>
      </div>
      {showDetails && (
        <div className="review-requirement-container-details">
          <div style={{ display: "flex", columnGap: "8px", flexWrap: "wrap" }}>
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
                fontWeight: "500",
                color: "#1967d2",
              }}
            >
              Họ và tên:
            </p>
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
              }}
            >
              {firstName === null
                ? `${lastName}`
                : lastName === null
                ? `${firstName}`
                : `${firstName} ${lastName}`}
            </p>
          </div>
          <div style={{ display: "flex", columnGap: "8px", flexWrap: "wrap" }}>
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
                fontWeight: "500",
                color: "#1967d2",
              }}
            >
              Điểm hiện tại:
            </p>
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
              }}
            >
              {currentScore}
            </p>
          </div>
          <div style={{ display: "flex", columnGap: "8px", flexWrap: "wrap" }}>
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
                fontWeight: "500",
                color: "#1967d2",
              }}
            >
              Điểm mong muốn:
            </p>
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
              }}
            >
              {expectScore}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              columnGap: "8px",
              flexWrap: "wrap",
            }}
          >
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
                fontWeight: "500",
                color: "#1967d2",
              }}
            >
              Lí do:
            </p>
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
              }}
            >
              {explanation}
            </p>
          </div>
          <Button
            variant="contained"
            sx={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              textTransform: "none",
              margin: "16px 0px",
            }}
            onClick={handleClickViewDetails}
          >
            Xem chi tiết
          </Button>
          {/* <Button
            variant="contained"
            sx={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              textTransform: "none",
              margin: "16px 0px",
            }}
            onClick={handleClickOpen}
          >
            Cập nhật điểm
          </Button> */}
          {/* <Dialog open={open} fullWidth>
            <DialogTitle>Cập nhật điểm số</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nhập điểm số mới"
                type="number"
                autoComplete="off"
                fullWidth
                variant="standard"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button
                onClick={handleClose}
                disabled={
                  isNaN(parseFloat(grade))
                    ? true
                    : Number(grade) >= 0 && Number(grade) <= 100
                    ? false
                    : true
                }
              >
                Cập nhật
              </Button>
            </DialogActions>
          </Dialog>
          <TipTap
            setContentMsg={setContentMsg}
            placeholderTipTap="Nhập bình luận..."
          />
          <Button
            disabled={
              contentMsg === "" ||
              contentMsg === "<p></p>" ||
              contentMsg.length > 255 ||
              sending
                ? true
                : false
            }
            sx={{ marginTop: "16px" }}
            variant="contained"
            onClick={handleSendCommentByTeacher}
          >
            Gửi
          </Button> */}
        </div>
      )}
    </>
  );
};

export default ReviewRequirement;
