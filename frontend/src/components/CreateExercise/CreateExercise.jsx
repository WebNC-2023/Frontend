import "./CreateExercise.css";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
// import ListItemText from "@mui/material/ListItemText";
// import ListItem from "@mui/material/ListItem";
// import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import TipTap from "../TipTap/TipTap";
import TextField from "@mui/material/TextField";
// import { MuiFileInput } from "mui-file-input";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import AssignmentCardForTeacher from "../AssignmentCard/AssignmentCardForTeacher";
// import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
// import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
// import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
// import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateExercise = () => {
  const [openForm, setOpenForm] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [contentMsg, setContentMsg] = React.useState("");
  //const [valueFile, setValueFile] = React.useState(null);
  const [titleContent, setTitleContent] = React.useState("");
  const dispatch = useDispatch();
  const assignments = useSelector(
    (state) => state.classroomDetailsInfo.assignments
  );
  // const handleChange = (newValue) => {
  //   setValueFile(newValue);
  // };
  const handleClickOpenForm = (scrollType) => {
    setOpenForm(true);
    setScroll(scrollType);
  };
  const handleCloseForm = () => {
    setTitleContent("");
    setOpenForm(false);
  };
  const handleGiveAssignment = () => {
    let present = new Date();
    let gmt7Time = new Date(present.getTime() + 7 * 60 * 60 * 1000);
    dispatch(
      addAssignment({
        assignment_title: titleContent,
        assignment_instruction: contentMsg,
        assignment_score: 100,
        assignment_published: `${
          gmt7Time.getUTCHours().toString().length === 1
            ? "0" + gmt7Time.getUTCHours().toString()
            : gmt7Time.getUTCHours().toString()
        }:${
          gmt7Time.getUTCMinutes().toString().length === 1
            ? "0" + gmt7Time.getUTCMinutes().toString()
            : gmt7Time.getUTCMinutes().toString()
        }:${
          gmt7Time.getUTCSeconds().toString().length === 1
            ? "0" + gmt7Time.getUTCSeconds().toString()
            : gmt7Time.getUTCSeconds().toString()
        } ${gmt7Time.getUTCDate()} thg ${
          gmt7Time.getUTCMonth() + 1
        }, ${gmt7Time.getUTCFullYear()}`,
      })
    );
    setTitleContent("");
    setOpenForm(false);
  };
  return (
    <>
      <div className="createExercise-container">
        <div className="createExercise-flex">
          <Button
            style={{
              borderRadius: "30px",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: "500",
            }}
            variant="contained"
            startIcon={
              <AddIcon
                style={{
                  fontSize: "1.75rem",
                }}
              />
            }
            onClick={() => handleClickOpenForm("paper")}
          >
            Tạo
          </Button>
          <Dialog
            fullScreen
            open={openForm}
            TransitionComponent={Transition}
            scroll={scroll}
          >
            <AppBar sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleCloseForm}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  Bài tập
                </Typography>
                <Button
                  autoFocus
                  color="inherit"
                  onClick={handleGiveAssignment}
                  disabled={titleContent === "" ? true : false}
                >
                  Giao bài
                </Button>
              </Toolbar>
            </AppBar>
            <DialogContent dividers={scroll === "paper"}>
              <TextField
                autoComplete="off"
                label="Tiêu đề"
                variant="filled"
                fullWidth
                sx={{ paddingBottom: "16px" }}
                value={titleContent}
                onChange={(e) => setTitleContent(e.target.value)}
              />
              <TipTap
                setContentMsg={setContentMsg}
                placeholderTipTap="Hướng dẫn (Không bắt buộc)"
              />
              {/* <div className="upload-exercise-section">
                            <p>Đính kèm</p>
                            <MuiFileInput
                              value={valueFile}
                              placeholder="Tải tệp lên"
                              color="primary"
                              onChange={handleChange}
                              clearIconButtonProps={{
                                title: "Xóa",
                                children: <CloseIcon fontSize="small" />,
                              }}
                            />
                          </div> */}
              <div
                style={{
                  border: "1px solid #dadce0",
                  marginTop: "16px",
                  padding: "16px",
                  borderRadius: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                    fontWeight: "500",
                    color: "#5f6368",
                    paddingBottom: "16px",
                  }}
                >
                  Điểm
                </p>
                <TextField
                  type="number"
                  autoComplete="off"
                  variant="filled"
                  value={100}
                  disabled
                />
                <p
                  style={{
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                    fontWeight: "500",
                    color: "#5f6368",
                    padding: "16px 0px",
                  }}
                >
                  Dành cho
                </p>
                <TextField
                  autoComplete="off"
                  variant="filled"
                  value={"Tất cả học viên"}
                  disabled
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="createExercise-flex-direction-column">
          {assignments.map((assignment, index) => (
            <AssignmentCardForTeacher
              key={index}
              assignment_title={assignment.assignment_title}
              assignment_published={assignment.assignment_published}
              assignment_instruction={assignment.assignment_instruction}
              assignment_score={assignment.assignment_score}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateExercise;
