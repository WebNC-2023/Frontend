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
import { useContext, useState } from "react";
import Axios from "../../redux/APIs/Axios";
import { useNavigate, useParams } from "react-router-dom";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { toast } from "react-toastify";
import { update } from "../../redux/Reducers/fullNameUserSlice";
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

const ClassroomEveryoneStudent = ({
  firstName,
  lastName,
  avatar,
  email,
  userId,
}) => {
  const { language } = useContext(DataContext);
  const people = useSelector((state) => state.classroomDetailsInfo.people);
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [openRemoveDialog, setOpenRemoveDialog] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const { classId } = useParams();
  const dispatch = useDispatch();
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseRemoveDialog = () => {
    setOpenRemoveDialog(false);
  };
  const handleOpenRemoveDialog = () => {
    setAnchorEl(null);
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
            classroomAvatar: res2.data.data.avatar,
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
              ? `${email}  ${
                  language === "English" ? "(Invited)" : "(Đã được mời)"
                }`
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
                {language === "English" ? "Delete a student" : "Xóa học sinh"}
              </MenuItem>
            </StyledMenu>
            <Dialog open={openRemoveDialog} fullWidth>
              <DialogTitle>
                {language === "English" ? "Delete a student?" : "Xóa học sinh?"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {language === "English"
                    ? "The student will not be able to open this class unless invited again."
                    : "Học sinh này sẽ không thể mở lớp này nếu không được mời lại."}
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
                    onClick={handleRemoveStudent}
                  >
                    {deleting
                      ? language === "English"
                        ? "Deleting..."
                        : "Đang xóa..."
                      : language === "English"
                      ? "Delete"
                      : "Xóa"}
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
