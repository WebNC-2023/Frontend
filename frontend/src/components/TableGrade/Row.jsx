import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import TipTap from "../TipTap/TipTap";
import TextField from "@mui/material/TextField";
import { Tooltip, Stack, Menu, MenuItem } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import { Draggable } from "react-beautiful-dnd";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Row(props) {
  const { row, index } = props;
  const [open, setOpen] = useState(false);

  const [classAnchorEl, setClassAnchorEl] = React.useState(null);
  const openMenuClass = Boolean(classAnchorEl);

  const handleClick = (event) => {
    setClassAnchorEl(event.currentTarget);
  };

  const handleClassClose = () => {
    setClassAnchorEl(null);
  };
  const [openForm, setOpenForm] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [contentMsg, setContentMsg] = React.useState(row.content);
  const [titleContent, setTitleContent] = React.useState(row.name);

  const handleClickOpenForm = (scrollType) => {
    setOpenForm(true);
    setScroll(scrollType);
  };
  const handleCloseForm = () => {
    setTitleContent("");
    setOpenForm(false);
  };

  const handleEditSubmit = () => {
    console.log("cap nhat thanh cong");
    setOpenForm(false);
  };

  const [grade, setGrade] = useState(0);
  const [openEditScore, setOpenEditScore] = useState(false);

  const handleClickOpenEditScore = () => {
    setOpenEditScore(true);
  };

  const handleCloseEditScore = () => {
    setOpenEditScore(false);
  };

  return (
    <React.Fragment>
      <Draggable draggableId={row.name} index={index}>
        {(provided) => (
          <TableRow
            sx={{ "& > *": { borderBottom: "unset" } }}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.gradeScale}</TableCell>
            <TableCell align="right">{row.classAvgScore}</TableCell>
            <TableCell align="right">{row.ExpirTime}</TableCell>

            <TableCell align="right">
              <Stack
                direction="row"
                justifyContent="end"
                alignItems="end"
                spacing={1}
              >
                <Tooltip title="Edit Grade Composition">
                  <IconButton
                    aria-label="Edit"
                    sx={{ color: "#5175e0" }}
                    size="medium"
                    onClick={() => handleClickOpenForm("paper")}
                  >
                    <EditIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Remove Grade Composition">
                  <IconButton
                    aria-label="Remove"
                    sx={{ color: "#BF3131" }}
                    size="medium"
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </TableCell>
          </TableRow>
        )}
      </Draggable>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 4, marginBottom: "40px" }}>
              <Typography variant="h6" gutterBottom component="div">
                List of assigned students
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                sx={{ width: "80%", margin: "auto" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>StudentId</TableCell>
                    <TableCell>FullName</TableCell>
                    <TableCell align="right">Grade</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.people.map((peopleRow) => (
                    <TableRow
                      key={peopleRow.id}
                      onMouseEnter={() => (peopleRow.hovered = true)}
                      onMouseLeave={() => (peopleRow.hovered = false)}
                    >
                      <TableCell
                        component="th"
                        scope="row"
                        style={{ padding: "16px" }}
                      >
                        {peopleRow.id}
                      </TableCell>
                      <TableCell style={{ padding: "16px" }}>
                        {peopleRow.studentName}
                      </TableCell>
                      <TableCell align="right" style={{ padding: "16px" }}>
                        {peopleRow.grade}
                      </TableCell>
                      <TableCell
                        style={{ padding: "16px", textAlign: "right" }}
                      >
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
                              filter:
                                "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
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
                          <MenuItem
                            key="updateGrade"
                            onClick={handleClickOpenEditScore}
                          >
                            Update grade
                          </MenuItem>
                          <MenuItem key="returnTheLesson">
                            Return the lesson
                          </MenuItem>
                          <MenuItem key="view">View assignment</MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      {/* Edit Asm */}
      <Dialog
        fullScreen
        open={openForm}
        TransitionComponent={Transition}
        scroll={scroll}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleCloseForm}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Assignment
            </Typography>
            <Button
              autoFocus
              color="inherit"
              disabled={titleContent === "" ? true : false}
              onClick={() => handleEditSubmit()}
            >
              Update Assignment
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent dividers={scroll === "paper"}>
          <TextField
            autoComplete="off"
            label="Tiêu đề"
            variant="filled"
            fullWidth
            sx={{ paddingBottom: "16px" }}
            value={titleContent}
            onChange={(e) => setTitleContent(e.target.value)}
          />
          <TipTap
            setContentMsg={setContentMsg}
            placeholderTipTap="Hướng dẫn (Không bắt buộc)"
          />
          <div
            style={{
              border: "1px solid #dadce0",
              marginTop: "16px",
              padding: "16px",
              borderRadius: "10px",
            }}
          >
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: "500",
                color: "#5f6368",
                paddingBottom: "16px",
              }}
            >
              Điểm
            </p>
            <TextField
              type="number"
              autoComplete="off"
              variant="filled"
              value={100}
              disabled
            />
            <p
              style={{
                fontSize: "0.875rem",
                lineHeight: "1.25rem",
                fontWeight: "500",
                color: "#5f6368",
                padding: "16px 0px",
              }}
            >
              Dành cho
            </p>
            <TextField
              autoComplete="off"
              variant="filled"
              value={"Tất cả học viên"}
              disabled
            />
          </div>
        </DialogContent>
      </Dialog>
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
            onClick={handleCloseEditScore}
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
}
