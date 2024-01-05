import React, { useState } from "react";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import { Menu, MenuItem } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

const TableScoreStudent = ({
  updatedPeopleRow,
  peopleRow,
  handleEditScore,
}) => {
  const [classAnchorEl, setClassAnchorEl] = React.useState(null);

  const [grade, setGrade] = useState(peopleRow.score);

  const [openEditScore, setOpenEditScore] = useState(false);

  const handleClickOpenEditScore = () => {
    setOpenEditScore(true);
  };

  const handleCloseEditScore = () => {
    setOpenEditScore(false);
  };

  const handleSubmitEditScore = () => {
    handleEditScore(peopleRow.id, Number(grade));

    setOpenEditScore(false);
  };

  const openMenuClass = Boolean(classAnchorEl);

  const handleClick = (event) => {
    setClassAnchorEl(event.currentTarget);
  };

  const handleClassClose = () => {
    setClassAnchorEl(null);
  };

  return (
    <React.Fragment>
      <TableRow
        onMouseEnter={() => (updatedPeopleRow.hovered = true)}
        onMouseLeave={() => (updatedPeopleRow.hovered = false)}
      >
        <TableCell component="th" scope="row" style={{ padding: "16px" }}>
          {peopleRow.studentId}
        </TableCell>
        <TableCell style={{ padding: "16px" }}>{peopleRow.fullName}</TableCell>
        <TableCell align="right" style={{ padding: "16px" }}>
          {grade}
        </TableCell>
        <TableCell style={{ padding: "16px", textAlign: "right" }}>
          <IconButton
            aria-label="App"
            sx={{ color: "#5175e0" }}
            size="medium"
            onClick={handleClick}
          >
            <MoreVertIcon fontSize="inherit" />
          </IconButton>
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
                  width: 20,
                  height: 20,
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
            transformOrigin={{
              horizontal: "right",
              vertical: "top",
            }}
            anchorOrigin={{
              horizontal: "right",
              vertical: "bottom",
            }}
          >
            <MenuItem key="updateGrade" onClick={handleClickOpenEditScore}>
              Update grade
            </MenuItem>
            <MenuItem key="view">View assignment</MenuItem>
          </Menu>
        </TableCell>
      </TableRow>
      {/* Edit score */}
      <Dialog open={openEditScore} fullWidth>
        <DialogTitle>Cập nhật điểm số</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nhập điểm số mới"
            type="number"
            autoComplete="off"
            fullWidth
            variant="standard"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditScore}>Hủy</Button>
          <Button
            onClick={handleSubmitEditScore}
            disabled={
              isNaN(parseFloat(grade))
                ? true
                : Number(grade) >= 0 && Number(grade) <= 100
                ? false
                : true
            }
          >
            Cập nhật
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default TableScoreStudent;
