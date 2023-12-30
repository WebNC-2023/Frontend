import "./ReviewRequirement.css";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import TipTap from "../TipTap/TipTap";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { isNaN } from "formik";
const ReviewRequirement = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [contentMsg, setContentMsg] = useState("");
  const [grade, setGrade] = useState(0);
  const [value, setValue] = useState("no");

  const handleChange = (event) => {
    setValue(event.target.value);
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
          <div>
            <FormControl>
              <FormLabel
                id="demo-radio-buttons-group-label"
                sx={{
                  fontSize: "0.875rem",
                  lineHeight: "1.5rem",
                  color: "#1967d2",
                  fontWeight: "500",
                }}
              >
                Quyết định thay đổi điểm số?
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="yes"
                  control={<Radio size="small" />}
                  label={
                    <Typography
                      sx={{ fontSize: "0.875rem", lineHeight: "1.5rem" }}
                    >
                      Có
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="no"
                  control={<Radio size="small" />}
                  label={
                    <Typography
                      sx={{ fontSize: "0.875rem", lineHeight: "1.5rem" }}
                    >
                      Không
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>
          </div>
          {value === "yes" && (
            <TextField
              id="standard-basic"
              type="number"
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
              }}
              label={
                <Typography sx={{ fontSize: "0.875rem", lineHeight: "1.5rem" }}>
                  Nhập điểm mới
                </Typography>
              }
              variant="standard"
              sx={{
                paddingBottom: "16px",
                fontSize: "0.875rem",
                lineHeight: "1.5rem",
              }}
            />
          )}
          <TipTap
            setContentMsg={setContentMsg}
            placeholderTipTap="Viết nhận xét"
          />
          <Button
            disabled={value === "no" ? false : isNaN(parseFloat(grade)) ? true : false}
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
