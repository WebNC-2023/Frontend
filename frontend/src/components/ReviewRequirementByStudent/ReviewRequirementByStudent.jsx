import "./ReviewRequirementByStudent.css";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
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
import { isNaN } from "formik";
const ReviewRequirementByStudent = () => {
  const [show, setShow] = useState(false);
  const [contentMsg, setContentMsg] = useState("");
  const [showMsg, setShowMsg] = useState(false);
  const [open, setOpen] = useState(false);
  const [expectationGrade, setExpectationGrade] = useState(0);
  const [explanationMsg, setExplanationMsg] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <div
        className={
          show
            ? "review-requirement-by-student-show"
            : "review-requirement-by-student"
        }
        onClick={() => setShow(!show)}
      >
        <div className="review-requirement-by-student-title">
          <IconButton
            sx={{
              backgroundColor: "#4285f4",
              color: "#ffffff",
              "&:hover": { backgroundColor: "#4285f4" },
            }}
          >
            <AssignmentIcon />
          </IconButton>

          <p
            style={{
              color: "#3c4043",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: "500",
            }}
          >
            Bài tập 1
          </p>
        </div>
        <div className="review-requirement-by-student-score">50/100</div>
      </div>
      {show && (
        <div className="review-requirement-by-student-details">
          <Button
            startIcon={<PreviewIcon />}
            sx={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              textTransform: "none",
            }}
            onClick={handleClickOpen}
          >
            Yêu cầu xem lại điểm
          </Button>
          <Dialog open={open} fullWidth>
            <DialogTitle>Yêu cầu xem lại điểm</DialogTitle>
            <DialogContent>
              <TextField
                id="filled-read-only-input"
                label="Điểm hiện tại"
                defaultValue="50/100"
                InputProps={{
                  readOnly: true,
                }}
                variant="filled"
                fullWidth
                autoComplete="off"
              />
              <TextField
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
                value={expectationGrade}
                onChange={(e) => setExpectationGrade(e.target.value)}
              />
              <TextField
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
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Hủy</Button>
              <Button
                disabled={
                  explanationMsg !== "" &&
                  !isNaN(parseFloat(expectationGrade)) &&
                  parseFloat(expectationGrade) >= 0 &&
                  parseFloat(expectationGrade) <= 100
                    ? false
                    : true
                }
                onClick={handleClose}
              >
                Gửi yêu cầu
              </Button>
            </DialogActions>
          </Dialog>
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
              {showMsg ? "Ẩn cuộc hội thoại" : "Hiện cuộc hội thoại"}
            </Button>
          </div>
          {showMsg && (
            <>
              <Comment commentBackgroundColor={"#ffffff"} />
              <Comment commentBackgroundColor={"#e7f0ff"} />
              <TipTap
                setContentMsg={setContentMsg}
                placeholderTipTap="Viết bình luận..."
              />
              <Button
                sx={{ marginTop: "16px" }}
                variant="contained"
                endIcon={<SendIcon />}
                disabled={
                  contentMsg === "<p></p>" || contentMsg === "" ? true : false
                }
              >
                Gửi
              </Button>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ReviewRequirementByStudent;
