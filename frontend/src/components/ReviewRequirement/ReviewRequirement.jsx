import "./ReviewRequirement.css";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import TipTap from "../TipTap/TipTap";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { isNaN } from "formik";
import Comment from "../Comment/Comment";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
const ReviewRequirement = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [contentMsg, setContentMsg] = useState("");
  const [grade, setGrade] = useState(0);
  const [open, setOpen] = useState(false);

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
          !showDetails
            ? "review-requirement-container"
            : "review-requirement-container-showDetails"
        }
        onClick={() =>
          setShowDetails((prev) => {
            if (!prev) {
              setContentMsg("");
            }
            return !prev;
          })
        }
      >
        <IconButton
          sx={{
            backgroundColor: "#4285f4",
            color: "#ffffff",
            "&:hover": { backgroundColor: "#4285f4" },
          }}
        >
          <ReviewsOutlinedIcon />
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
            xyz đã đăng một yêu cầu xem lại điểm: qưewqjkdfsdjfndsfkjsdnfksdf
          </p>

          <p
            style={{
              color: "#5f6368",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              wordBreak: "break-word",
            }}
          >
            10:28:00 30 thg 12, 2023
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
              Nguyen Van A
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
              MSSV:
            </p>
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
              }}
            >
              20120194
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
              Điểm thành phần:
            </p>
            <p
              style={{
                wordBreak: "break-word",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
              }}
            >
              BTVN 20%, GK 30%, CK 50%
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
              8
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
              9
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
              đề thi khó, không đủ thời gian làm bài
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
          <Comment commentBackgroundColor={"#ffffff"} />
          <Comment commentBackgroundColor={"#e7f0ff"} />
          <TipTap
            setContentMsg={setContentMsg}
            placeholderTipTap="Nhập bình luận..."
          />
          <Button
            disabled={
              contentMsg === "" || contentMsg === "<p></p>" ? true : false
            }
            sx={{ marginTop: "16px" }}
            variant="contained"
          >
            Gửi
          </Button>
        </div>
      )}
    </>
  );
};

export default ReviewRequirement;
