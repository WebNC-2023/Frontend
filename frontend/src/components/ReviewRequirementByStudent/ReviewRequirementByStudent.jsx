import "./ReviewRequirementByStudent.css";
//import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button } from "@mui/material";
// import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import PreviewIcon from "@mui/icons-material/Preview";
import TipTap from "../TipTap/TipTap";
import Comment from "../Comment/Comment";
import SendIcon from "@mui/icons-material/Send";
import CommentIcon from "@mui/icons-material/Comment";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../../redux/APIs/Axios";
import { toast } from "react-toastify";
import {
  updateAssignmentDetails,
  updateReload,
} from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { useParams } from "react-router-dom";
import { DataContext } from "../../contexts/DataContext";
const ReviewRequirementByStudent = () => {
  const { language } = useContext(DataContext);
  const [contentMsg, setContentMsg] = useState("");
  const [showMsg, setShowMsg] = useState(true);
  const [open, setOpen] = useState(false);
  const [expectationGrade, setExpectationGrade] = useState(100);
  const [explanationMsg, setExplanationMsg] = useState("");
  const [sendingReviewRequest, setSendingReviewRequest] = useState(false);
  const [sendingComment, setSendingComment] = useState(false);
  const { assignmentId } = useParams();
  const dispatch = useDispatch();
  const assignmentDetail = useSelector(
    (state) => state.classroomDetailsInfo.assignmentDetail
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const reload = useSelector((state) => state.classroomDetailsInfo.reload);
  const handleSendReviewRequest = () => {
    async function sendReviewRequest() {
      setSendingReviewRequest(true);
      try {
        const res = await Axios({
          method: "POST",
          url: `/scores/${assignmentDetail.scoreId}/request-review`,
          data: {
            expectScore: Number(expectationGrade),
            explanation: explanationMsg,
          },
        });
        setSendingReviewRequest(false);
        setOpen(false);
        toast.success(`${res.data.message}`, { autoClose: 3000 });
        dispatch(updateReload(!reload));
      } catch (error) {
        setSendingReviewRequest(false);
        setOpen(false);
        toast.error(`${error}`, { autoClose: 3000 });
      }
    }
    sendReviewRequest();
  };
  const handleSendComment = () => {
    async function sendComment() {
      setSendingComment(true);
      try {
        await Axios({
          url: `/scores/reviews/${assignmentDetail.reviewId}/comments`,
          method: "POST",
          data: {
            comment: contentMsg,
          },
        });
        const res1 = await Axios({
          method: "GET",
          url: `/assignments/${assignmentId}`,
        });
        dispatch(updateAssignmentDetails(res1.data.data));
        setSendingComment(false);
        setContentMsg("");
      } catch (error) {
        setSendingComment(false);
        toast.error(`${error}`, { autoClose: 3000 });
      }
    }
    sendComment();
  };
  return (
    <>
      <div className="review-requirement-by-student-details">
        <Button
          startIcon={<PreviewIcon />}
          sx={
            assignmentDetail.reviewId !== undefined
              ? {
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  textTransform: "none",
                  pointerEvents: "none",
                  color: "gray",
                }
              : {
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  textTransform: "none",
                }
          }
          onClick={handleClickOpen}
        >
          {language === "English"
            ? "Request for grade review"
            : "Yêu cầu xem xét lại điểm"}
        </Button>
        <Dialog open={open} fullWidth>
          <DialogTitle>Yêu cầu xem xét lại điểm</DialogTitle>
          <DialogContent>
            <TextField
              id="filled-read-only-input"
              label="Điểm hiện tại"
              defaultValue={`${assignmentDetail.score}/100`}
              InputProps={{
                readOnly: true,
              }}
              variant="filled"
              fullWidth
              autoComplete="off"
            />
            <TextField
              required
              sx={{ marginTop: "16px" }}
              id="filled-number"
              label="Điểm mong muốn"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              fullWidth
              autoComplete="off"
              value={Number(expectationGrade)}
              onChange={(e) => setExpectationGrade(e.target.value)}
              disabled={sendingReviewRequest ? true : false}
              autoFocus
            />
            <TextField
              required
              sx={{ marginTop: "16px" }}
              id="filled-text"
              label="Lí do"
              type="text"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              fullWidth
              autoComplete="off"
              spellCheck="false"
              value={explanationMsg}
              onChange={(e) => setExplanationMsg(e.target.value)}
              disabled={sendingReviewRequest ? true : false}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Hủy</Button>
            <Button
              disabled={
                assignmentDetail.reviewId === undefined &&
                explanationMsg !== "" &&
                !sendingReviewRequest &&
                Number.isInteger(Number(expectationGrade)) &&
                Number(expectationGrade) >= 0 &&
                Number(expectationGrade) <= 100
                  ? false
                  : true
              }
              onClick={handleSendReviewRequest}
            >
              {sendingReviewRequest ? "Đang gửi..." : "Gửi yêu cầu"}
            </Button>
          </DialogActions>
        </Dialog>
        {assignmentDetail.reviewId !== undefined ? (
          <div>
            <Button
              startIcon={showMsg ? <VisibilityOffIcon /> : <CommentIcon />}
              sx={{
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                textTransform: "none",
              }}
              onClick={() =>
                setShowMsg((prev) => {
                  if (!prev) {
                    setContentMsg("");
                  }
                  return !prev;
                })
              }
            >
              {showMsg
                ? language === "English"
                  ? "Hide the conversation"
                  : "Ẩn cuộc hội thoại"
                : language === "English"
                ? "Show the conversation"
                : "Hiện cuộc hội thoại"}
            </Button>
          </div>
        ) : (
          <></>
        )}
        {showMsg && assignmentDetail.reviewId && (
          <>
            {assignmentDetail.comments !== undefined ? (
              assignmentDetail.comments.map((cmt, index) => (
                <Comment
                  key={index}
                  firstName={
                    cmt.userId ===
                    JSON.parse(localStorage.getItem("userInfo")).id
                      ? language === "English"
                        ? "Me"
                        : "Tôi"
                      : cmt.user.firstName
                  }
                  lastName={
                    cmt.userId ===
                    JSON.parse(localStorage.getItem("userInfo")).id
                      ? null
                      : cmt.user.lastName
                  }
                  avatar={cmt.user.avatar}
                  comment={cmt.comment}
                  dateCreated={cmt.dateCreated}
                  commentBackgroundColor={
                    cmt.userId ===
                    JSON.parse(localStorage.getItem("userInfo")).id
                      ? "#cfffd1"
                      : "#e7f0ff"
                  }
                />
              ))
            ) : (
              <></>
            )}
            <TipTap
              setContentMsg={setContentMsg}
              placeholderTipTap={
                language === "English"
                  ? "Write a comment..."
                  : "Viết bình luận..."
              }
              content={contentMsg}
              tipTapFocus={true}
            />
            <Button
              sx={{ marginTop: "16px" }}
              variant="contained"
              endIcon={<SendIcon />}
              disabled={
                contentMsg === "<p></p>" ||
                contentMsg === "" ||
                contentMsg.length > 255 ||
                sendingComment
                  ? true
                  : false
              }
              onClick={handleSendComment}
            >
              {language === "English" ? "Send" : "Gửi"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default ReviewRequirementByStudent;
