import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import "./ReviewDetailsPage.css";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { useDispatch, useSelector } from "react-redux";
import { useMemo, useState } from "react";
import parser from "html-react-parser";
import TipTap from "../../components/TipTap/TipTap";
import Comment from "../../components/Comment/Comment";
import Axios from "../../redux/APIs/Axios";
import { updateReviewDetails } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { toast } from "react-toastify";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
const ReviewDetailsPage = () => {
  const reviewDetails = useSelector(
    (state) => state.classroomDetailsInfo.reviewDetails
  );
  const [contentMsg, setContentMsg] = useState("");
  const [grade, setGrade] = useState(0);
  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showChat, setShowChat] = useState(true);
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
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
      return `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:${sec.toString().padStart(2, "0")}, ${day
        .toString()
        .padStart(2, "0")} thg ${month.toString().padStart(2, "0")}, ${year}`;
    }
    return convertTime(reviewDetails.assignmentDateCreated);
  }, [reviewDetails.assignmentDateCreated]);
  const handleSendComment = () => {
    async function sendComment() {
      setSending(true);
      try {
        await Axios({
          method: "POST",
          url: `/scores/reviews/${reviewDetails.reviewId}/comments`,
          data: {
            comment: contentMsg,
          },
        });
        const res = await Axios({
          method: "GET",
          url: `/scores/reviews/${reviewDetails.reviewId}`,
        });
        setContentMsg("");
        dispatch(updateReviewDetails(res.data.data));
        setSending(false);
      } catch (error) {
        setSending(false);
        toast.error(`${error}`, { autoClose: 3000 });
      }
    }
    sendComment();
  };
  const handleUpdateScore = () => {
    async function updateScore() {
      setUpdating(true);
      try {
        const res = await Axios({
          url: `/scores/reviews/${reviewDetails.reviewId}/score-again`,
          method: "POST",
          data: {
            scoreAgain: Number(grade),
          },
        });
        const res1 = await Axios({
          method: "GET",
          url: `/scores/reviews/${reviewDetails.reviewId}`,
        });
        dispatch(updateReviewDetails(res1.data.data));
        setUpdating(false);
        setOpen(false);
        toast.success(`${res.data.message}`, { autoClose: 3000 });
      } catch (error) {
        setUpdating(false);
        setOpen(false);
        toast.error(`${error}`, { autoClose: 3000 });
      }
    }
    updateScore();
  };
  return (
    <>
      <HomePageHeader showSidebar={true} classRoom={true} />
      <div className="review-details-page">
        <div className="review-details-page-flex">
          <div className="review-details-page-icon">
            <IconButton
              sx={{
                backgroundColor: "#4285f4",
                color: "#ffffff",
                "&:hover": { backgroundColor: "#4285f4" },
              }}
            >
              <ReviewsIcon />
            </IconButton>
          </div>
          <div className="review-details-page-content">
            <p
              style={{
                color: "#1967d2",
                fontSize: "1.875rem",
                lineHeight: "2.25rem",
                paddingBottom: "16px",
                wordBreak: "break-word",
              }}
            >
              {reviewDetails.assignmentTitle}
            </p>
            <p
              style={{
                color: "#5f6368",
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                paddingBottom: "16px",
                wordBreak: "break-word",
              }}
            >
              {`Bài tập được tạo vào lúc ${dateCreated}`}
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
                borderTop: "1px solid #4285f4",
              }}
            >
              {parser(reviewDetails.assignmentDescription)}
            </div>
            <p
              style={{
                fontWeight: "500",
                color: "#4285f4",
                wordBreak: "break-word",
              }}
            >
              Điểm số hiện tại: {reviewDetails.score}
            </p>
            <p
              style={{
                fontWeight: "500",
                color: "#4285f4",
                wordBreak: "break-word",
              }}
            >
              Điểm số mong muốn: {reviewDetails.expectScore}
            </p>
            <p
              style={{
                fontWeight: "500",
                color: "#4285f4",
                wordBreak: "break-word",
              }}
            >
              Lí do: {reviewDetails.explanation}
            </p>
            {reviewDetails.scoreAgain && <p
              style={{
                fontWeight: "500",
                color: "#4285f4",
                wordBreak: "break-word",
              }}
            >
              Điểm đã chấm lại: {reviewDetails.scoreAgain}
            </p>}
            <Button
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
            </Button>
            <Dialog open={open} fullWidth>
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
                  value={Number(grade)}
                  onChange={(e) => setGrade(e.target.value)}
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button
                  onClick={handleUpdateScore}
                  disabled={
                    !updating &&
                    Number.isInteger(Number(grade)) &&
                    Number(grade) >= 0 &&
                    Number(grade) <= 100
                      ? false
                      : true
                  }
                >
                  {updating ? "Đang cập nhật..." : "Cập nhật"}
                </Button>
              </DialogActions>
            </Dialog>
            <div>
              <Button
                variant="contained"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  textTransform: "none",
                  marginBottom: "16px"
                }}
                startIcon={
                  !showChat ? <QuestionAnswerIcon /> : <CommentsDisabledIcon />
                }
                onClick={() =>
                  setShowChat((prev) => {
                    if (!prev) {
                      setContentMsg("");
                    }
                    return !prev;
                  })
                }
              >
                {!showChat ? "Hiển thị đoạn chat" : "Ẩn đoạn chat"}
              </Button>
            </div>
            {showChat &&
              reviewDetails.comments.map((cmt, index) => (
                <Comment
                  key={index}
                  commentBackgroundColor={
                    cmt.user.email ===
                    JSON.parse(localStorage.getItem("userInfo")).email
                      ? "#cfffd1"
                      : "#e7f0ff"
                  }
                  firstName={
                    cmt.user.email ===
                    JSON.parse(localStorage.getItem("userInfo")).email
                      ? "Tôi"
                      : cmt.user.firstName
                  }
                  lastName={
                    cmt.user.email ===
                    JSON.parse(localStorage.getItem("userInfo")).email
                      ? null
                      : cmt.user.lastName
                  }
                  avatar={cmt.user.avatar}
                  dateCreated={cmt.dateCreated}
                  comment={cmt.comment}
                />
              ))}
            {showChat && (
              <TipTap
                setContentMsg={setContentMsg}
                placeholderTipTap="Nhập bình luận..."
                content={contentMsg}
                tipTapFocus={true}
              />
            )}
            {showChat && (
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
                onClick={handleSendComment}
              >
                Gửi
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewDetailsPage;
