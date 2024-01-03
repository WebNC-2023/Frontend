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
import DialogContentText from "@mui/material/DialogContentText";
import Axios from "../../redux/APIs/Axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
const InviteTeacherToClassroom = () => {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const { classId } = useParams();
  const dispatch = useDispatch();
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSendInviteTeacher = () => {
    async function sendInviteTeacher() {
      setSending(true);
      try {
        await Axios.post(`/classes/${classId}/invite`, {
          email: content,
          role: "teacher",
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
    sendInviteTeacher();
  };
  return (
    <>
      <Tooltip title="Mời giáo viên">
        <IconButton color="primary" size="large" onClick={handleClickOpen}>
          <PersonAddAltOutlinedIcon sx={{ color: "#1967d2" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} fullWidth>
        <DialogTitle>Mời giáo viên</DialogTitle>
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
          <DialogContentText
            sx={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              padding: "10px 0",
              userSelect: "none",
            }}
          >
            Giáo viên mà bạn thêm có thể làm mọi thứ bạn làm, trừ xóa lớp học.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={sending ? true : false}>
            Huỷ
          </Button>
          <Button
            onClick={handleSendInviteTeacher}
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
            {sending ? "Đang mời..." : "Mời"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InviteTeacherToClassroom;
