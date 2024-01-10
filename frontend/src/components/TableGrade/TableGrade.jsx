import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import Row from "./Row";
import { toast } from "react-toastify";
import { editAsmAction } from "../../redux/Actions/classAction";
import { updateClassroomDetailsInfo } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import Axios from "../../redux/APIs/Axios";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { DataContext } from "../../contexts/DataContext";

const TableGrade = () => {
  const { language } = useContext(DataContext);
  const dispatch = useDispatch();
  const {
    id,
    assignments,
    people,
    name: nameOfClass,
  } = useSelector((state) => state.classroomDetailsInfo);

  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.editAsm
  );
  // Tạo một đối tượng ánh xạ studentId với thông tin sinh viên
  const studentInfoMap = {};
  people.forEach((student) => {
    const fullName = `${student.firstName} ${student.lastName}`;
    studentInfoMap[student.id] = { fullName };
  });

  // Cập nhật mảng assignments với thuộc tính FullName và avgScore
  const updatedAssignmentsArray = assignments?.map((assignment) => {
    // Thêm thuộc tính FullName vào scores
    const scoresWithFullName = assignment?.scores?.map((score) => ({
      ...score,
      fullName: studentInfoMap[score.studentId].fullName,
    }));

    // Trả về assignment mới với scores được cập nhật và avgScore
    return {
      ...assignment,
      scores: scoresWithFullName,
    };
  });

  console.log(updatedAssignmentsArray);

  const [originalRows, setOriginalRows] = useState(updatedAssignmentsArray);
  const [rows, setRows] = useState(updatedAssignmentsArray);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // kiểm tra có sự thay đổi nào không
  useEffect(() => {
    // Kiểm tra xem có thay đổi chưa được lưu không
    const changes = JSON.stringify(originalRows) !== JSON.stringify(rows);
    setHasChanges(changes);
  }, [originalRows, rows]);

  // Kiểm tra thay đổi khi change URL
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Hiển thị modal nếu có thay đổi chưa được lưu
      if (hasChanges) {
        const message =
          "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    // Gắn sự kiện beforeunload
    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up sự kiện khi component unmount
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasChanges]);

  // successfull & error edit
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/classes/${id}`);
        dispatch(
          updateClassroomDetailsInfo({
            id: res.data.data.id,
            name: res.data.data.name,
            topic: res.data.data.topic,
            room: res.data.data.room,
            isOwner: res.data.data.isOwner,
            people: res.data.data.people,
            owner: res.data.data.owner,
            classroomAvatar: res.data.data.avatar,
            assignments: res.data.data.assignments,
            reviews: res.data.data.reviews,
          })
        );
      } catch (error) {
        console.error(error.response);
      }
    };

    if (isError) {
      toast.error(isError);
      dispatch({ type: "EDIT_ASM_RESET" });
    }
    if (isSuccess) {
      fetchData();
      toast.success("Update successfully !");
      setHasChanges(false); // Reset hasChanges state to false
      dispatch({ type: "EDIT_ASM_RESET" });
    }
  }, [isSuccess, isError, dispatch, id]);

  // DnD
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedRows = Array.from(rows);
    const [reorderedRow] = updatedRows.splice(result.source.index, 1);
    updatedRows.splice(result.destination.index, 0, reorderedRow);

    setRows(updatedRows);
  };

  // remove asm
  const handleRemoveRow = (idAsm) => {
    const updatedRowsAfterDelete = rows.filter((row) => row.id !== idAsm);

    setRows(updatedRowsAfterDelete);
  };

  // Edit asm
  const handleEditRow = (idAsm, titleUpdate, desUpdate) => {
    const updatedRows = rows?.map((row) => {
      if (row.id === idAsm) {
        return {
          ...row,
          title: titleUpdate,
          description: desUpdate,
        };
      }
      return row;
    });

    setRows(updatedRows);
  };

  // edit score
  const handleEditScore = (idAsm, studentId, newScore) => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        scores: row.scores?.map((sc) =>
          row.id === idAsm && sc.studentId === studentId
            ? { ...sc, score: newScore, isReturned: false }
            : sc
        ),
      }))
    );
  };

  const handleEditScoreFileUpload = (idAsm, newScores) => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        scores:
          row.id === idAsm
            ? newScores.map((newScore) => {
                const existingScore = row.scores?.find(
                  (sc) => sc.studentId === newScore.studentId
                );
                return {
                  ...existingScore,
                  score: newScore.score,
                  isReturned: false,
                };
              })
            : row.scores,
      }))
    );
  };

  // return the lesson
  const handleReturnLesson = (idScore) => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        scores: row.scores?.map((sc) =>
          sc.id === idScore ? { ...sc, isReturned: true } : sc
        ),
      }))
    );
  };

  // return all lessons
  const handleReturnAllLessons = (idAsm) => {
    setRows((prevRows) =>
      prevRows.map((row) => ({
        ...row,
        scores: row.scores?.map((sc) =>
          row.id === idAsm && sc.score !== null
            ? { ...sc, isReturned: true }
            : sc
        ),
      }))
    );
  };

  // Reset dữ liệu
  const handleResetData = () => {
    // Kiểm tra xem có thay đổi chưa được lưu không
    if (hasChanges) {
      setIsModalOpen(true);
    } else {
      // Nếu không có thay đổi, đặt lại dữ liệu
      setRows(originalRows);
    }
  };

  // Hủy việc đặt lại dữ liệu
  const handleCancelReset = () => {
    setIsModalOpen(false);
  };

  // Xác nhận việc đặt lại dữ liệu
  const handleConfirmReset = () => {
    setRows(originalRows);
    setIsModalOpen(false);
  };

  // submit handle
  const handleSubmitEdit = () => {
    const datas = {
      classId: id,
      assignments: rows,
    };

    dispatch(editAsmAction(datas));
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable" direction="vertical">
          {(provided) => (
            <TableContainer
              component={Paper}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Table aria-label="collapsible table">
                <TableHead>
                  <TableRow>
                    <TableCell />
                    <TableCell>
                      {language === "English"
                        ? "Assignment Header"
                        : "Tiêu đề bài tập"}
                    </TableCell>
                    <TableCell align="right">
                      {language === "English" ? "Grade Scale" : "Thang điểm"}
                    </TableCell>
                    <TableCell align="right">
                      {language === "English"
                        ? "Class average score"
                        : "Điểm trung bình của lớp"}
                    </TableCell>
                    <TableCell align="right">
                      {language === "English"
                        ? "Expiration date"
                        : "Ngày hết hạn"}
                    </TableCell>
                    <TableCell align="right">
                      {language === "English" ? "Action" : "Hành động"}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.map((row, index) => (
                    <Row
                      key={row.id}
                      row={row}
                      index={index}
                      handleRemoveRow={handleRemoveRow}
                      handleEditRow={handleEditRow}
                      handleEditScore={handleEditScore}
                      nameOfClass={nameOfClass}
                      handleReturnLesson={handleReturnLesson}
                      handleReturnAllLessons={handleReturnAllLessons}
                      handleEditScoreFileUpload={handleEditScoreFileUpload}
                    />
                  ))}
                  {provided.placeholder}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Droppable>
      </DragDropContext>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Box>
          <Button
            style={{
              margin: "0 20px",
              color: "#fff",
              backgroundColor: "#1bbd7e",
            }}
            variant="contained"
            // onClick={() => exportStudentListToExcel(people, nameOfClass)}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {language === "English" ? "Download" : "Tải xuống"}
              <FileDownloadIcon
                fontSize="small"
                sx={{
                  marginLeft: 1,
                  color: "#fff",
                  backgroundColor: "#1bbd7e",
                }}
              />
            </Box>
          </Button>
        </Box>
        <Box>
          <Button
            style={{
              margin: "0 20px",
              color: "#fff",
              backgroundColor: isLoading
                ? "#a0a0a0"
                : !hasChanges
                ? "#a0a0a0"
                : "#BF3131",
            }}
            variant="contained"
            onClick={handleResetData}
            disabled={!hasChanges || isLoading}
          >
            {language === "English" ? "Cancel" : "Hủy"}
          </Button>
          <Button
            style={{
              color: "#fff",
              backgroundColor: !hasChanges || isLoading ? "#a0a0a0" : "#5175e0",
            }}
            variant="contained"
            onClick={handleSubmitEdit}
            disabled={!hasChanges || isLoading}
          >
            {isLoading
              ? language === "English"
                ? "Loading...."
                : "Đang tải..."
              : language === "English"
              ? "Save Changes"
              : "Lưu những thay đổi"}
          </Button>
        </Box>
      </Box>

      {/* Thông báo modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>
          {language === "English"
            ? "Unsaved Changes"
            : "Những thay đổi chưa được lưu"}
        </DialogTitle>
        <DialogContent>
          <Typography>
            {language === "English"
              ? "You have unsaved changes. Are you sure you want to cancel and discard these changes?"
              : "Bạn có các thay đổi chưa lưu. Bạn có chắc chắn muốn hủy và loại bỏ những thay đổi này?"}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>
            {language === "English" ? "No" : "Không đồng ý"}
          </Button>
          <Button onClick={handleConfirmReset} autoFocus>
            {language === "English" ? "Yes" : "Đồng ý"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableGrade;
