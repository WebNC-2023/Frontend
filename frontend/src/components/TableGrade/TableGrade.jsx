import React, { useState } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import { Tooltip, Stack, Menu, MenuItem } from "@mui/material";

function createData(name, gradeScale, classAvgScore, ExpirTime) {
  return {
    name,
    gradeScale,
    classAvgScore,
    ExpirTime,
    people: [
      {
        id: "123",
        studentName: "Luu Tuan Khanh",
        grade: null,
      },
      {
        id: "234",
        studentName: "Luu Tuan Khanh Clone",
        grade: null,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  const [classAnchorEl, setClassAnchorEl] = React.useState(null);
  const openMenuClass = Boolean(classAnchorEl);

  const handleClick = (event) => {
    setClassAnchorEl(event.currentTarget);
  };

  const handleClassClose = () => {
    setClassAnchorEl(null);
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
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
                          <MenuItem key="updateGrade">Update grade</MenuItem>
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
    </React.Fragment>
  );
}

const rows = [
  createData("AsmTest1 ", 100, null, null),
  createData("AsmTest2", 100, null, null),
  createData("AsmTest3", 100, null, null),
  createData("AsmTest4", 100, null, null),
  createData("AsmTest5", 100, null, null),
];

export default function TableGrade() {
  return (
    <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell> Assignment Header</TableCell>
            <TableCell align="right">Grade Scale</TableCell>
            <TableCell align="right">Class average score</TableCell>
            <TableCell align="right">Expiration date</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
