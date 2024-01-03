import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Row from "./Row";

const createData = (name, gradeScale, classAvgScore, expirTime, content) => {
  return {
    name,
    gradeScale,
    classAvgScore,
    expirTime,
    content,
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
};

const initialRows = [
  createData("AsmTest1", 100, null, null, "Sử dụng react để làm bài"),
  createData("AsmTest2", 100, null, null, "Sử dụng react để làm bài"),
  createData("AsmTest3", 100, null, null, "Sử dụng react để làm bài"),
  createData("AsmTest4", 100, null, null, "Sử dụng react để làm bài"),
  createData("AsmTest5", 100, null, null, "Sử dụng react để làm bài"),
];

const TableGrade = () => {
  const [rows, setRows] = useState(initialRows);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const updatedRows = Array.from(rows);
    const [reorderedRow] = updatedRows.splice(result.source.index, 1);
    updatedRows.splice(result.destination.index, 0, reorderedRow);

    setRows(updatedRows);
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
                  {rows.map((row, index) => (
                    <Row key={row.name} row={row} index={index} />
                  ))}
                  {provided.placeholder}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TableGrade;
