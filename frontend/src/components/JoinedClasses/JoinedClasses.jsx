import Avatar from "@mui/material/Avatar";

import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import * as React from "react";
import { Link } from "react-router-dom";
import "./JoinedClasses.css";
import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormDialogCreateClass from "../FormDialog/FormDialogCreateClass";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  unSubClassAction,
  deleteClassAction,
} from "../../redux/Actions/classAction";

const JoinedClasses = ({ classData }) => {
  const [classAnchorEl, setClassAnchorEl] = React.useState(null);
  const openMenuClass = Boolean(classAnchorEl);
  const [openDialogEditClass, setOpenDialogEditClass] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isError } = useSelector((state) => state.unSubClass);

  const { isError: deleteIsError } = useSelector((state) => state.deleteClass);

  React.useEffect(() => {
    if (isError || deleteIsError) {
      toast.error(isError || deleteIsError);
      dispatch({
        type: "UNSUB_CLASS_RESET",
      });
      dispatch({
        type: "DELETE_CLASS_RESET",
      });
    }
  }, [dispatch, isError, deleteIsError]);

  const handleClick = (event) => {
    setClassAnchorEl(event.currentTarget);
  };

  const handleClassClose = () => {
    setClassAnchorEl(null);
  };

  const handleOpenDialogEdit = () => {
    setOpenDialogEditClass(true);
  };

  const handleCloseDialogEdit = () => {
    setOpenDialogEditClass(false);
  };

  const handleCopyLinkClick = async () => {
    const classLink = `/class-details/${classData.id}`;
    const currentURL = window.location.origin + classLink;

    try {
      await navigator.clipboard.writeText(currentURL);
      toast.success("Copied to clipboard");
    } catch (error) {
      toast.error("Can not copy to clipboard");
    }

    handleClassClose();
  };

  const handleUnSubscribe = () => {
    dispatch(unSubClassAction(classData.id));
    handleClassClose();
  };

  const handleDeleteClass = () => {
    dispatch(deleteClassAction(classData.id));
    handleClassClose();
  };

  const navgiateHandle = (e) => {
    if (e.target.classList.contains("joined__content")) {
      navigate(`/class-details/${classData.id}`);
    }
  };

  const urlImage = classData.avatar
    ? classData.avatar
    : "https://gstatic.com/classroom/themes/Physics.jpg";

  const urlAvatarOwner = classData.owner.avatar
    ? `https://webnc-2023.vercel.app/files/${classData.owner.avatar}`
    : "https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg";

  return (
    <li className="joined__list">
      <div className="joined__wrapper">
        <div className="joined__container">
          <div className="joined__imgWrapper" />
          <div
            className="joined__image"
            style={{
              backgroundImage: `url(${urlImage})`,
            }}
          />
          <div className="joined__content" onClick={navgiateHandle}>
            <Link
              className="joined__title"
              to={`/class-details/${classData.id}`}
            >
              <h2>{classData.name}</h2>
              <h4>{classData.part}</h4>
            </Link>
            {!classData.isOwner && (
              <p className="joined__owner">
                {classData.owner.lastName} {classData.owner.firstName}
              </p>
            )}
          </div>
          <div className="joined__edit">
            <IconButton
              aria-label="App"
              sx={{ color: "white" }}
              size="large"
              onClick={handleClick}
            >
              <MoreVertIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
        {!classData.isOwner && (
          <Avatar className="joined__avatar" src={urlAvatarOwner} />
        )}
      </div>
      {/* Dialog Create Class */}
      <FormDialogCreateClass
        open={openDialogEditClass}
        handleClose={handleCloseDialogEdit}
        edit={true}
        classData={classData}
      />
      {/* Menu Class */}
      <Menu
        anchorEl={classAnchorEl}
        id="class-menu"
        open={openMenuClass}
        onClose={handleClassClose}
        onClick={handleClassClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 0.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1.5,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 20,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {classData.isOwner && [
          <MenuItem key="copyLink" onClick={handleCopyLinkClick}>
            Copy the invite link
          </MenuItem>,
          <MenuItem key="edit" onClick={handleOpenDialogEdit}>
            Edit
          </MenuItem>,
          <MenuItem key="delete" onClick={handleDeleteClass}>
            Delete
          </MenuItem>,
        ]}
        {!classData.isOwner && (
          <MenuItem onClick={handleUnSubscribe}>Unsubscribe</MenuItem>
        )}
      </Menu>
      <div className="joined__bottom">
        <IconButton aria-label="App" size="large" className="IconButton">
          <PermContactCalendarIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="App" size="large" className="IconButton">
          <FolderOpenIcon fontSize="inherit" />
        </IconButton>
      </div>
    </li>
  );
};

export default JoinedClasses;
