import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "../../redux/APIs/Axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { Box } from "@mui/material";

import { exportStudentListToExcel } from "../../utils/exportToExcel";

const InviteStudentToClassroom = () => {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const { classId } = useParams();
  const dispatch = useDispatch();
  const { people, name: nameOfClass } = useSelector(
    (state) => state.classroomDetailsInfo
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSendInviteStudent = () => {
    async function sendInviteStudent() {
      setSending(true);
      try {
        await Axios.post(`/classes/${classId}/invite`, {
          email: content,
          role: "student",
        });
        const res = await Axios.get(`/classes/${classId}`);
        dispatch(
          updateClassroomDetailsInfo({
            id: res.data.data.id,
            name: res.data.data.name,
            topic: res.data.data.topic,
            room: res.data.data.room,
            isOwner: res.data.data.isOwner,
            people: res.data.data.people,
            owner: res.data.data.owner,
            classroomAvatar: res.data.data.avatar,
            assignments: res.data.data.assignments,
            reviews: res.data.data.reviews,
          })
        );
        setSending(false);
        setOpen(false);
        setContent("");
      } catch (error) {
        console.log(error.response);
      }
    }
    sendInviteStudent();
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Box>
          <Tooltip title="Mời học sinh">
            <IconButton color="primary" size="large" onClick={handleClickOpen}>
              <PersonAddAltOutlinedIcon sx={{ color: "#1967d2" }} />
            </IconButton>
          </Tooltip>
        </Box>
        <Box>
          <Button
            style={{
              margin: "0 20px",
              color: "#fff",
              backgroundColor: "#5175e0",
            }}
            variant="contained"
            sx={{
              fontSize: "0.7rem",
              minWidth: "70px",
              minHeight: "28px",
            }}
            onClick={() => exportStudentListToExcel(people, nameOfClass)}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              Download
              <FileDownloadIcon
                fontSize="small"
                sx={{
                  marginLeft: 1,
                  color: "#fff",
                  backgroundColor: "#5175e0",
                }}
              />
            </Box>
          </Button>

          <Button
            style={{
              margin: "0 20px",
              color: "#fff",
              backgroundColor: "#5175e0",
            }}
            variant="contained"
            sx={{
              fontSize: "0.7rem",
              minWidth: "70px",
              minHeight: "28px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              Upload
              <FileUploadIcon
                fontSize="small"
                sx={{
                  marginLeft: 1,
                  color: "#fff",
                  backgroundColor: "#5175e0",
                }}
              />
            </Box>
          </Button>
        </Box>
      </Box>
      <Dialog open={open} fullWidth>
        <DialogTitle>Mời học sinh</DialogTitle>
        <DialogContent>
          <TextField
            disabled={sending ? true : false}
            autoFocus
            margin="dense"
            id="name"
            label="Nhập email"
            type="email"
            fullWidth
            variant="standard"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={sending ? true : false}>
            Huỷ
          </Button>
          <Button
            onClick={handleSendInviteStudent}
            disabled={
              !/^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{1,32}$/.test(
                content
              ) ||
              sending ||
              people.filter((element1) => element1.email === content).length !==
                0
                ? true
                : false
            }
          >
            {sending ? "Đang mời" : "Mời"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InviteStudentToClassroom;
