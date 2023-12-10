import { Avatar } from "@mui/material";
import "./ClassroomEveryoneTeacher.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
//import Axios from "../../redux/APIs/Axios";
//import { useParams } from "react-router-dom";
const ClassroomEveryoneTeacher = ({
  firstName,
  lastName,
  avatar,
  email,
  userId,
}) => {
  const owner = useSelector((state) => state.classroomDetailsInfo.owner);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  // const { classId } = useParams();
  // const [sending, setSending] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };
  const handleClickDelete = () => {
    setOpen(false);
    setOpenDelete(true);
  };
  const handleRemoveMember = () => {
    //setSending(true);
    // async function removeMember() {
    //   try {
    //     const res = await Axios.post(`/classes/${classId}/remove-member`, {
    //       data: {
    //         userId,
    //       },
    //     });
    //     console.log(res.data.message);
    //     setSending(false);
    //   } catch (error) {
    //     console.log(error.response.message);
    //   }
    // }
    // removeMember();
  };

  return (
    <div className="classroom-everyone-teacher-container">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          columnGap: "20px",
        }}
      >
        <Avatar
          src={avatar}
          sx={
            firstName === null && lastName === null
              ? {
                  width: 35,
                  height: 35,
                  backgroundColor: "#dcdcdc",
                  color: "#b2b2b2",
                }
              : {
                  width: 35,
                  height: 35,
                  backgroundColor: "#a0c3ff",
                  color: "#4374e0",
                }
          }
        />
        <div
          className="classroom-everyone-teacher-name"
          style={
            firstName === null && lastName === null
              ? {
                  color: "#959799",
                }
              : {}
          }
        >
          {firstName === null && lastName === null
            ? `${email}  (Đã được mời)`
            : `${firstName} ${lastName}`}
        </div>
      </div>
      {(firstName === null && lastName === null) || owner.email === email ? (
        <></>
      ) : (
        <>
          <IconButton onClick={handleClickOpen}>
            <MoreVertIcon />
          </IconButton>
          <Dialog open={open} onClose={handleClose} fullWidth>
            <Button onClick={handleClose}>Gửi email</Button>
            <Button onClick={handleClickDelete}>Xoá</Button>
            <Button onClick={handleClose}>Tạo chủ sở hữu lớp học</Button>
          </Dialog>
          <Dialog open={openDelete} fullWidth>
            <DialogTitle>Xoá giáo viên?</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Giáo viên này sẽ không thể mở lớp này nếu không được mời lại.
              </DialogContentText>
              <DialogActions>
                <Button onClick={handleCloseDelete}>Huỷ</Button>
                <Button onClick={handleRemoveMember}>Xoá</Button>
              </DialogActions>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ClassroomEveryoneTeacher;
