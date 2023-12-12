import { Avatar } from "@mui/material";
import "../ClassroomEveryoneTeacher/ClassroomEveryoneTeacher.css";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Axios from "../../redux/APIs/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { toast } from "react-toastify";
import { update } from "../../redux/Reducers/fullNameUserSlice";
const ClassroomEveryoneStudent = ({
  firstName,
  lastName,
  avatar,
  email,
  userId,
}) => {
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  const [open, setOpen] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { classId } = useParams();
  const dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };
  const handleOpenRemoveDialog = () => {
    setOpen(false);
    setOpenRemoveDialog(true);
  };
  const handleRemoveStudent = () => {
    async function sendRemoveTeacher() {
      setDeleting(true);
      try {
        const res1 = await Axios.post(`/classes/${classId}/remove-member`, {
          userId: userId,
        });
        const res2 = await Axios.get(`/classes/${classId}`);
        dispatch(
          updateClassroomDetailsInfo({
            name: res2.data.data.name,
            topic: res2.data.data.topic,
            room: res2.data.data.room,
            isOwner: res2.data.data.isOwner,
            people: res2.data.data.people,
            owner: res2.data.data.owner,
          })
        );
        setOpenRemoveDialog(false);
        setDeleting(false);
        toast.success(`${res1.data.message}`, {
          autoClose: 3000,
        });
      } catch (error) {
        if (error?.response?.data === "Unauthorized") {
          localStorage.removeItem("userInfo");
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );
          navigate("/login");
        } else {
          console.log(error.response);
          setDeleting(false);
          setOpenRemoveDialog(false);
          toast.error(`Delete fail!`, {
            autoClose: 3000,
          });
        }
      }
    }
    sendRemoveTeacher();
  };
  return (
    <>
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
        {people.filter(
          (element) =>
            element.email ===
              JSON.parse(localStorage.getItem("userInfo")).email &&
            element.role === "teacher"
        ).length === 0 ? (
          <></>
        ) : firstName !== null || lastName !== null ? (
          <>
            <IconButton onClick={handleClickOpen}>
              <MoreVertIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth>
              <Button onClick={handleOpenRemoveDialog}>Xoá học sinh</Button>
            </Dialog>
            <Dialog open={openRemoveDialog} fullWidth>
              <DialogTitle>Xoá học sinh?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Học sinh này sẽ không thể mở lớp này nếu không được mời lại.
                </DialogContentText>
                <DialogActions>
                  <Button
                    disabled={deleting ? true : false}
                    onClick={handleCloseRemoveDialog}
                  >
                    Huỷ
                  </Button>
                  <Button
                    disabled={deleting ? true : false}
                    onClick={handleRemoveStudent}
                  >
                    {deleting ? "Đang xoá..." : "Xoá"}
                  </Button>
                </DialogActions>
              </DialogContent>
            </Dialog>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ClassroomEveryoneStudent;
