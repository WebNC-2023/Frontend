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
import { Tooltip, Stack, DialogTitle, DialogActions } from "@mui/material";
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
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AssignmentReturnIcon from "@mui/icons-material/AssignmentReturn";
import { exportGradesForAnAssignmentToExcel } from "../../utils/exportToExcel";
import { useSelector } from "react-redux";

import { importGradesToAnAssignmentFormExcel } from "../../utils/exportToExcel";

import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Row(props) {
  const {
    row,
    index,
    handleRemoveRow,
    handleEditRow,
    handleEditScore,
    nameOfClass,
    handleReturnLesson,
    handleReturnAllLessons,
    handleEditScoreFileUpload,
  } = props;

  const { assignments } = useSelector((state) => state.classroomDetailsInfo);

  const [open, setOpen] = useState(false);

  const [openForm, setOpenForm] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [contentMsg, setContentMsg] = React.useState(row.description);
  const [titleContent, setTitleContent] = React.useState(row.title);
  const [avgScoreClass, setAvgScoreClass] = React.useState(null);
  const [allScoreNull, setAllScoreNull] = React.useState(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [uniqueKey, setUniqueKey] = React.useState(new Date().getTime());

  const assignment = assignments.find((asm) => asm.id === row.id);

  React.useEffect(() => {
    const avgScoreHandle = () => {
      // Tính avgScore
      const totalScore = row?.scores?.reduce((sum, sc) => {
        // Kiểm tra nếu sc.isReturned là true thì mới tính vào tổng điểm
        if (sc.isReturned) {
          return sum + sc.score;
        }
        return sum;
      }, 0);

      const returnedScores = row?.scores?.filter((sc) => sc.isReturned);
      const avgScore =
        returnedScores?.length > 0 ? totalScore / returnedScores.length : 0;

      setAvgScoreClass(avgScore.toFixed(1));
    };

    const areAllScoresNull = () => {
      // true or false
      const checkNull = row?.scores?.every((sc) => sc.score === null);

      setAllScoreNull(checkNull);
    };

    avgScoreHandle();
    areAllScoresNull();
  }, [row.scores]);

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

  // Reset dữ liệu
  const handleClickOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleSubmitReturnAllLessons = () => {
    handleReturnAllLessons(row.id);
    setIsModalOpen(false);
  };
  // download file Excel
  const handleFileDownload = (scores, nameOfClass, assignmentName) => {
    try {
      exportGradesForAnAssignmentToExcel(scores, nameOfClass, assignmentName);
      toast.success("Download successful!");
    } catch (error) {
      console.error("Error exporting grades:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  // Hàm kiểm tra xem studentId có thuộc mảng cũ hay không v
  const isStudentIdValid = (newArray, oldScores) => {
    const newStudentIds = newArray.map((item) => item.studentId);

    // Check if any new studentId does not exist in the oldScores array
    const hasNewStudentId = newStudentIds.some(
      (id) => !oldScores.some((score) => score.studentId === id)
    );
    return !hasNewStudentId;
  };

  // Hàm upload mảng cũ

  // Upload file Excel
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      try {
        const excelDataArray = await importGradesToAnAssignmentFormExcel(file);

        // Tạo mảng mới từ dữ liệu Excel
        const newArray = excelDataArray.map((row) => ({
          studentId: parseInt(row[0]),
          score: parseInt(row[1]),
        }));

        // Kiểm tra xem studentId có thuộc mảng cũ hay không
        if (!isStudentIdValid(newArray, row.scores)) {
          toast.error(
            "Invalid studentId found in the uploaded file. Please check and try again."
          );
          event.target.value = null;
          return;
        }

        toast.success("Upload successfully !");

        // handleEditScore(row.id)

        handleEditScoreFileUpload(row.id, newArray);

        event.target.value = null;
      } catch (error) {
        console.error("Error processing Excel file:", error);

        toast.error(`Error : ${error.message}`);
      }
    }
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
            <TableCell align="right">
              {avgScoreClass !== "0.0" ? avgScoreClass : null}
            </TableCell>
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

                <Tooltip title="Return All Lessons">
                  <IconButton
                    aria-label="Return"
                    sx={{ color: "#1bbd7e" }}
                    size="medium"
                    onClick={handleClickOpenModal}
                    disabled={allScoreNull}
                  >
                    <AssignmentReturnIcon fontSize="inherit" />
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 4,
                  marginBottom: 4,
                }}
              >
                <Box>
                  <Typography variant="h6" gutterBottom component="div">
                    List of assigned students
                  </Typography>
                </Box>
                <Box>
                  <Button
                    style={{
                      color: "#fff",
                      backgroundColor: "#5175e0",
                    }}
                    variant="contained"
                    sx={{
                      fontSize: "0.7rem",
                      minWidth: "70px",
                      minHeight: "28px",
                    }}
                    onClick={() =>
                      handleFileDownload(
                        assignment.scores,
                        nameOfClass,
                        row.title
                      )
                    }
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Download
                      <CloudDownloadIcon
                        fontSize="small"
                        sx={{
                          marginLeft: 1,
                          color: "#fff",
                          backgroundColor: "#5175e0",
                        }}
                      />
                    </Box>
                  </Button>
                  <Button
                    style={{
                      marginLeft: "20px",
                      color: "#fff",
                      backgroundColor: "#5175e0",
                    }}
                    variant="contained"
                    sx={{
                      fontSize: "0.7rem",
                      minWidth: "70px",
                      minHeight: "28px",
                    }}
                    component="label"
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Upload
                      <CloudUploadIcon
                        fontSize="small"
                        sx={{
                          marginLeft: 1,
                          color: "#fff",
                          backgroundColor: "#5175e0",
                        }}
                      />
                    </Box>
                    <input
                      type="file"
                      accept=".xlsx"
                      style={{ display: "none" }}
                      onChange={(event) => handleFileUpload(event)}
                      key={uniqueKey}
                    />
                  </Button>
                </Box>
              </Box>

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
                    const compoundKey = `${peopleRow?.id}-${peopleRow?.studentId}`;
                    // Create a new object with the same properties
                    const updatedPeopleRow = { ...peopleRow, hovered: false };

                    return (
                      <TableScoreStudent
                        updatedPeopleRow={updatedPeopleRow}
                        key={compoundKey}
                        peopleRow={peopleRow}
                        handleEditScore={handleEditScore}
                        idAsm={row.id}
                        handleReturnLesson={handleReturnLesson}
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
            tipTapFocus={true}
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

      {/* Thông báo modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Return these assignments?</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to return these assignments?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>No</Button>
          <Button onClick={handleSubmitReturnAllLessons} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
