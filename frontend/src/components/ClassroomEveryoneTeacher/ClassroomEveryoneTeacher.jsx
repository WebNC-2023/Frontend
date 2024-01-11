import { Avatar } from "@mui/material";
import "./ClassroomEveryoneTeacher.css";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton from "@mui/material/IconButton";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext, useState } from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Axios from "../../redux/APIs/Axios";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { useNavigate, useParams } from "react-router-dom";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { toast } from "react-toastify";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { DataContext } from "../../contexts/DataContext";
const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));
const ClassroomEveryoneTeacher = ({
  firstName,
  lastName,
  avatar,
  email,
  userId,
}) => {
  const { language } = useContext(DataContext);
  const navigate = useNavigate();
  const owner = useSelector((state) => state.classroomDetailsInfo.owner);
  const dispatch = useDispatch();
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [openLeaveDialog, setOpenLeaveDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const { classId } = useParams();
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClickOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };
  const handleCloseLeaveDialog = () => {
    setOpenLeaveDialog(false);
  };
  const handleOpenRemoveDialog = () => {
    setAnchorEl(null);
    setOpenRemoveDialog(true);
  };
  const handleOpenLeaveDialog = () => {
    setAnchorEl(null);
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
            classroomAvatar: res2.data.data.avatar,
          })
        );
        setOpenRemoveDialog(false);
        setDeleting(false);
        toast.success(language==="English"?`${res1.data.message}`:"Xóa thành công", {
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
          toast.error(language==="English"?`Delete fail!`:"Xóa thất bại", {
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
          toast.error(language==="English"?`Leave fail!`:"Rời lớp thất bại", {
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
              ? `${email}  ${
                  language === "English" ? "(Invited)" : "(Đã được mời)"
                }`
              : `${firstName} ${lastName}`}
          </div>
        </div>
        {email === JSON.parse(localStorage.getItem("userInfo")).email ? (
          email === owner.email ? (
            <></>
          ) : (
            <>
              <IconButton onClick={handleClickOpenMenu}>
                <MoreVertIcon />
              </IconButton>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleCloseMenu}
              >
                <MenuItem
                  style={{
                    fontSize: "0.875rem",
                    color: "black",
                  }}
                  onClick={handleOpenLeaveDialog}
                  disableRipple
                >
                  {language === "English"
                    ? "Leave the classroom"
                    : "Rời lớp học"}
                </MenuItem>
              </StyledMenu>
              <Dialog open={openLeaveDialog} fullWidth>
                <DialogTitle>
                  {language === "English"
                    ? "Leave the classroom?"
                    : "Rời khỏi lớp học?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    {language === "English"
                      ? "You will not be able to open this class unless you are invited back."
                      : "Bạn sẽ không thể mở lớp học này trừ khi bạn được mời trở lại."}
                    <b>
                      {language === "English"
                        ? " You cannot undo this action."
                        : " Bạn không thể hoàn tác hành động này."}
                    </b>
                  </DialogContentText>
                  <DialogActions>
                    <Button
                      disabled={leaving ? true : false}
                      onClick={handleCloseLeaveDialog}
                    >
                      {language === "English" ? "Cancel" : "Hủy"}
                    </Button>
                    <Button
                      disabled={leaving ? true : false}
                      onClick={handleTeacherLeave}
                    >
                      {leaving
                        ? language === "English"
                          ? "Leaving the classroom..."
                          : "Đang rời lớp..."
                        : language === "English"
                        ? "Leave the classroom"
                        : "Rời lớp"}
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
            <IconButton onClick={handleClickOpenMenu}>
              <MoreVertIcon />
            </IconButton>
            <StyledMenu
              id="demo-customized-menu"
              MenuListProps={{
                "aria-labelledby": "demo-customized-button",
              }}
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
            >
              <MenuItem
                style={{
                  fontSize: "0.875rem",
                  color: "black",
                }}
                onClick={handleOpenRemoveDialog}
                disableRipple
              >
                {language === "English"
                  ? "Delete a teacher"
                  : "Xóa giáo viên"}
              </MenuItem>
            </StyledMenu>
            <Dialog open={openRemoveDialog} fullWidth>
              <DialogTitle>
                {language === "English"
                  ? "Delete a teacher?"
                  : "Xóa giáo viên?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {language === "English"
                    ? "This teacher will not be able to open this class unless invited back."
                    : "Giáo viên này sẽ không thể mở lớp này nếu không được mời lại."}
                </DialogContentText>
                <DialogActions>
                  <Button
                    disabled={deleting ? true : false}
                    onClick={handleCloseRemoveDialog}
                  >
                    {language === "English" ? "Cancel" : "Hủy"}
                  </Button>
                  <Button
                    disabled={deleting ? true : false}
                    onClick={handleRemoveTeacher}
                  >
                    {deleting
                      ? language === "English"
                        ? "Deleting..."
                        : "Đang xoá..."
                      : language === "English"
                      ? "Delete"
                      : "Xoá"}
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

export default ClassroomEveryoneTeacher;
