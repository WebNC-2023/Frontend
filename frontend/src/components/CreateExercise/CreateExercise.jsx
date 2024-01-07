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
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import AssignmentCardForTeacher from "../AssignmentCard/AssignmentCardForTeacher";
import Axios from "../../redux/APIs/Axios";
// import LiveHelpOutlinedIcon from "@mui/icons-material/LiveHelpOutlined";
// import ClassOutlinedIcon from "@mui/icons-material/ClassOutlined";
// import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
// import ViewListOutlinedIcon from "@mui/icons-material/ViewListOutlined";
import { toast } from "react-toastify";

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
  const classId = useSelector((state) => state.classroomDetailsInfo.id);
  const people = useSelector((state) => state.classroomDetailsInfo.people);
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
    async function CreateAssignment() {
      try {
        let present = new Date();
        const res = await Axios({
          url: "/assignments",
          method: "POST",
          data: {
            classId,
            title: titleContent,
            description: contentMsg,
            type: "exam",
            dateCreated: present.toISOString(),
          },
        });
        await Axios({
          url: "/assignments/bulk",
          method: "PATCH",
          data: {
            classId,
            assignments: [
              ...assignments,
              {
                id: res.data.data.id,
                title: res.data.data.title,
                description: res.data.data.description,
                type: res.data.data.type,
                dateCreated: res.data.data.dateCreated,
                scores: people
                  .filter((element) => element.role === "student")
                  .map((student) => {
                    return {
                      score: null,
                      studentId: student.id,
                      isReturned: false,
                    };
                  }),
              },
            ],
          },
        });
        const res1 = await Axios.get(`/classes/${classId}`);
        dispatch(
          updateClassroomDetailsInfo({
            id: res1.data.data.id,
            name: res1.data.data.name,
            topic: res1.data.data.topic,
            room: res1.data.data.room,
            isOwner: res1.data.data.isOwner,
            people: res1.data.data.people,
            owner: res1.data.data.owner,
            classroomAvatar: res1.data.data.avatar,
            assignments: res1.data.data.assignments.map((element) => {
              return {
                id: element.id,
                title: element.title,
                description: element.description,
                type: element.type,
                dateCreated: element.dateCreated,
                scores: element.scores,
              };
            }),
            reviews: res1.data.data.reviews,

          })
        );
        setTitleContent("");
        setContentMsg("");
        setOpenForm(false);
        toast.success(`${res.data.message}`, {
          autoClose: 3000,
        });
      } catch (error) {
        if (error.response.status === 403)
          toast.error(`${error.response.message}`, { autoClose: 3000 });
        else toast.error(`${error}`, { autoClose: 3000 });
      }
    }
    CreateAssignment();
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
                  disabled={
                    titleContent === ""
                      ? true
                      : titleContent.length > 255 || contentMsg.length > 255
                      ? true
                      : false
                  }
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
                autoFocus
              />
              <TipTap
                setContentMsg={setContentMsg}
                placeholderTipTap="Hướng dẫn (Không bắt buộc)"
                content={contentMsg}
                tipTapFocus={false}
              />
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
              assignment_title={assignment.title}
              assignment_published={assignment.dateCreated}
              assignment_instruction={assignment.description}
              assignment_score={assignment.score ?? 100}
              assignment_id={assignment.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CreateExercise;
