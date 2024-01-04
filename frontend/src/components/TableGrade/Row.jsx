import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import TipTap from "../TipTap/TipTap";
import TextField from "@mui/material/TextField";
import { Tooltip, Stack } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { Draggable } from "react-beautiful-dnd";
import TableScoreStudent from "./TableScoreStudent";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Row(props) {
  const { row, index, handleRemoveRow, handleEditRow, handleEditScore } = props;
  const [open, setOpen] = useState(false);

  const [openForm, setOpenForm] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [contentMsg, setContentMsg] = React.useState(row.description);
  const [titleContent, setTitleContent] = React.useState(row.title);

  const handleClickOpenForm = (scrollType) => {
    setOpenForm(true);
    setScroll(scrollType);
  };
  const handleCloseForm = () => {
    setTitleContent(row.title);
    setOpenForm(false);
  };

  const handleEditSubmit = () => {
    handleEditRow(row.id, titleContent, contentMsg);
    setOpenForm(false);
  };

  return (
    <React.Fragment>
      <Draggable draggableId={row.title} index={index}>
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
              {row.title}
            </TableCell>
            <TableCell align="right">100</TableCell>
            <TableCell align="right">{row.classAvgScore || null}</TableCell>
            <TableCell align="right">{row.deadline || null}</TableCell>

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
                    onClick={() => handleRemoveRow(row.id)}
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
                  {row?.scores?.map((peopleRow) => {
                    // Create a new object with the same properties
                    const updatedPeopleRow = { ...peopleRow, hovered: false };

                    return (
                      <TableScoreStudent
                        updatedPeopleRow={updatedPeopleRow}
                        key={peopleRow.id}
                        peopleRow={peopleRow}
                        handleEditScore={handleEditScore}
                      />
                    );
                  })}
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
            content={contentMsg}
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
    </React.Fragment>
  );
}
