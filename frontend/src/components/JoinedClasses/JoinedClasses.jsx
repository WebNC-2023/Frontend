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

const JoinedClasses = ({ classData }) => {
  const [classAnchorEl, setClassAnchorEl] = React.useState(null);
  const openMenuClass = Boolean(classAnchorEl);
  const [openDialogEditClass, setOpenDialogEditClass] = React.useState(false);

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

  const handleCopyLinkClick = () => {
    toast.success("Link copied");
    handleClassClose();
  };

  return (
    <li className="joined__list">
      <div className="joined__wrapper">
        <div className="joined__container">
          <div className="joined__imgWrapper" />
          <div className="joined__image" />
          <div className="joined__content">
            <Link className="joined__title" to={`/${classData.id}`}>
              <h2>{classData.className}</h2>
              <h4>{classData.part}</h4>
            </Link>
            <p className="joined__owner">{classData.owner}</p>
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
        <Avatar
          className="joined__avatar"
          src="https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/s75-c-fbw=1/photo.jpg"
        />
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
        {" "}
        <MenuItem onClick={handleCopyLinkClick}>Copy the invite link</MenuItem>
        <MenuItem onClick={handleOpenDialogEdit}>Edit</MenuItem>
      </Menu>
      <div className="joined__bottom">
        <IconButton aria-label="App" size="large">
          <PermContactCalendarIcon fontSize="inherit" />
        </IconButton>
        <IconButton aria-label="App" size="large">
          <FolderOpenIcon fontSize="inherit" />
        </IconButton>
      </div>
    </li>
  );
};

export default JoinedClasses;
