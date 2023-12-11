import { Avatar } from "@mui/material";
import "./ClassroomEveryoneTeacher.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Axios from "../../redux/APIs/Axios";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { ToastContainer, toast } from "react-toastify";
const ClassroomEveryoneTeacher = ({
  firstName,
  lastName,
  avatar,
  email,
  userId,
}) => {
  const navigate = useNavigate();
  const owner = useSelector((state) => state.classroomDetailsInfo.owner);
  const dispatch = useDispatch();
  const [openOptionRemove, setOpenOptionRemove] = useState(false);
  const [openOptionLeave, setOpenOptionLeave] = useState(false);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const { classId } = useParams();
  // const [sending, setSending] = useState(false);
  const handleOpenOptionRemove = () => {
    setOpenOptionRemove(true);
  };
  const handleCloseOptionRemove = () => {
    setOpenOptionRemove(false);
  };
  const handleOpenOptionLeave = () => {
    setOpenOptionLeave(true);
  };
  const handleCloseOptionLeave = () => {
    setOpenOptionLeave(false);
  };
  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };
  const handleCloseLeaveDialog = () => {
    setOpenLeaveDialog(false);
  };
  const handleOpenRemoveDialog = () => {
    setOpenOptionRemove(false);
    setOpenRemoveDialog(true);
  };
  const handleOpenLeaveDialog = () => {
    setOpenOptionLeave(false);
    setOpenLeaveDialog(true);
  };
  const handleRemoveTeacher = () => {
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
  const handleTeacherLeave = () => {
    async function sendTeacherLeave() {
      setLeaving(true);
      try {
        await Axios.post(`/classes/${classId}/leave`);
        navigate("/home-page");
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
          setLeaving(false);
          setOpenLeaveDialog(false);
          toast.error(`Leave fail!`, {
            autoClose: 3000,
          });
        }
      }
    }
    sendTeacherLeave();
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
        {email === JSON.parse(localStorage.getItem("userInfo")).email ? (
          email === owner.email ? (
            <></>
          ) : (
            <>
              <IconButton onClick={handleOpenOptionLeave}>
                <MoreVertIcon />
              </IconButton>
              <Dialog
                open={openOptionLeave}
                onClose={handleCloseOptionLeave}
                fullWidth
              >
                <Button onClick={handleOpenLeaveDialog}>Rời lớp học</Button>
              </Dialog>
              <Dialog open={openLeaveDialog} fullWidth>
                <DialogTitle>Rời khỏi lớp học?</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Bạn sẽ không thể mở lớp học này trừ khi bạn được mời trở
                    lại.
                    <b> Bạn không thể hoàn tác hành động này.</b>
                  </DialogContentText>
                  <DialogActions>
                    <Button
                      disabled={leaving ? true : false}
                      onClick={handleCloseLeaveDialog}
                    >
                      Huỷ
                    </Button>
                    <Button
                      disabled={leaving ? true : false}
                      onClick={handleTeacherLeave}
                    >
                      {leaving ? "Đang rời lớp..." : "Rời lớp"}
                    </Button>
                  </DialogActions>
                </DialogContent>
              </Dialog>
            </>
          )
        ) : JSON.parse(localStorage.getItem("userInfo")).email ===
            owner.email &&
          (firstName !== null || lastName !== null) ? (
          <>
            <IconButton onClick={handleOpenOptionRemove}>
              <MoreVertIcon />
            </IconButton>
            <Dialog
              open={openOptionRemove}
              onClose={handleCloseOptionRemove}
              fullWidth
            >
              <Button onClick={handleOpenRemoveDialog}>Xoá</Button>
            </Dialog>
            <Dialog open={openRemoveDialog} fullWidth>
              <DialogTitle>Xoá giáo viên?</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Giáo viên này sẽ không thể mở lớp này nếu không được mời lại.
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
                    onClick={handleRemoveTeacher}
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
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={3000}
      />
    </>
  );
};

export default ClassroomEveryoneTeacher;
