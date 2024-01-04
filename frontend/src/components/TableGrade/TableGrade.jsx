import React, { useState, useEffect } from "react";
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

const TableGrade = () => {
  const dispatch = useDispatch();
  const { id, assignments } = useSelector(
    (state) => state.classroomDetailsInfo
  );

  const { isLoading, isSuccess, isError } = useSelector(
    (state) => state.editAsm
  );

  const [originalRows, setOriginalRows] = useState(assignments);
  const [rows, setRows] = useState(assignments);
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
    if (isError) {
      toast.error(isError);
      dispatch({ type: "EDIT_ASM_RESET" });
    }
    if (isSuccess) {
      toast.success("Update successfully !");
      setHasChanges(false); // Reset hasChanges state to false
    }
  }, [isSuccess, isError, dispatch]);

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

  const handleEditScore = (idScore, newScore) => {
    const updatedArray = rows?.map((obj) => {
      const newObj = { ...obj };
      if (newObj.scores && newObj.scores.length > 0) {
        newObj.scores = newObj.scores?.map((score) => {
          if (score.id === idScore) {
            return { ...score, score: newScore };
          }
          return score;
        });
      }

      return newObj;
    });

    // Đặt lại mảng đã cập nhật
    setRows(updatedArray);
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
    <div style={{ marginTop: "1rem" }}>
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
                    <TableCell> Assignment Header</TableCell>
                    <TableCell align="right">Grade Scale</TableCell>
                    <TableCell align="right">Class average score</TableCell>
                    <TableCell align="right">Expiration date</TableCell>
                    <TableCell align="right">Action</TableCell>
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
          justifyContent: "flex-end",
          marginTop: 4,
        }}
      >
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
          Cancel
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
          {isLoading ? "Loading...." : "Save Changes"}
        </Button>
      </Box>

      {/* Thông báo modal */}
      <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DialogTitle>Unsaved Changes</DialogTitle>
        <DialogContent>
          <Typography>
            You have unsaved changes. Are you sure you want to cancel and
            discard these changes?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsModalOpen(false)}>No</Button>
          <Button onClick={handleConfirmReset} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableGrade;
