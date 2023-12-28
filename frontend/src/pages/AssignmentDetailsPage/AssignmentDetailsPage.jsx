import { useState } from "react";
import HomePageHeader from "../../components/HomePageHeader/HomePageHeader";
import "./AssignmentDetailsPage.css";
import { MuiFileInput } from "mui-file-input";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import IconButton from "@mui/material/IconButton";
import parser from "html-react-parser";
const AssignmentDetailsPage = () => {
  const [valueFile, setValueFile] = useState(null);
  const handleChange = (newValue) => {
    setValueFile(newValue);
  };
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia
                repudiandae temporibus deleniti obcaecati! Explicabo alias velit
                fugit inventore ut eius, quam nemo dignissimos temporibus, atque
                quia, quod harum delectus excepturi!
              </p>
              <p
                style={{
                  color: "#5f6368",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  paddingBottom: "16px",
                }}
              >
                Nguyen Van A - 16:50:00 28 thg 12, 2023
              </p>
              <p
                style={{
                  color: "#3c4043",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  paddingBottom: "16px",
                  borderBottom: "1px solid #4285f4",
                }}
              >
                2/100
              </p>
              <div
                className="assignment-details-content-instruction"
                style={{
                  padding: "16px 0px",
                  fontSize: "0.875rem",
                  lineHeight: "1.25rem",
                  borderBottom: "2px solid #e8eaed",
                  color: "#3c4043",
                }}
              >
                {parser(
                  "<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo repellendus est dolorum omnis aliquam error amet cumque repellat laudantium fugiat, veniam incidunt qui suscipit deleniti assumenda nulla fugit! Perferendis, enim!</p><ul><li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis dolorum voluptatibus cum impedit quam minima nihil nisi voluptatum suscipit laborum assumenda adipisci, reprehenderit aliquid. Voluptatum aliquam sint illo molestiae enim.</li></ul>"
                )}
              </div>
            </div>
          </div>
          <div className="assignment-details-content-right">
            <div className="assignment-details-content-yourAssignment">
              <div className="assignment-details-content-yourAssignment-section1">
                <p style={{ color: "#3c4043", fontSize: "1.25rem" }}>
                  Bài tập của bạn
                </p>
                <p
                  style={{
                    color: "#2e7d32",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                  }}
                >
                  Đã giao
                </p>
              </div>
              <div className="assignment-details-content-yourAssignment-section2">
                <MuiFileInput
                  value={valueFile}
                  placeholder="Thêm bài nộp"
                  color="primary"
                  onChange={handleChange}
                  clearIconButtonProps={{
                    title: "Xóa",
                    children: <CloseIcon fontSize="small" />,
                  }}
                />
              </div>
              {valueFile && (
                <Button
                  fullWidth
                  sx={{ textTransform: "none" }}
                  variant="contained"
                >
                  Nộp bài
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AssignmentDetailsPage;
