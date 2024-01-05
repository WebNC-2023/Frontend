import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

// Export default template for student List
export const exportStudentListToExcel = (people, className) => {
  // Lọc danh sách người có role là 'teacher'
  const studentsDataToExport = people
    .filter((person) => person.role === "student")
    .map((student) => ({
      StudentId: student.id,
      FullName: `${student.firstName} ${student.lastName}`,
    }));

  const ws = XLSX.utils.json_to_sheet(studentsDataToExport, {
    header: ["StudentId", "FullName"],
    widths: [10, 20],
    cellStyles: true,
    raw: true,
  });

  // Định dạng cho cả cột A và B
  ws["!cols"] = [
    { wch: 10, s: { alignment: { horizontal: "center", vertical: "middle" } } },
    { wch: 20, s: { alignment: { horizontal: "center", vertical: "middle" } } },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Xuất file
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const fileName = `exported_studentLists_class_${className}.xlsx`;
  saveAs(data, fileName);
};

// Export default template for grades for an assignment
export const exportGradesForAnAssignmentToExcel = (
  scores,
  nameOfClass,
  assignmentName
) => {
  const gradesDataToExport = scores.map((sc) => ({
    StudentId: sc.studentId,
    Grade: sc.score,
  }));

  const ws = XLSX.utils.json_to_sheet(gradesDataToExport, {
    header: ["StudentId", "Grade"],
    widths: [10, 10],
    cellStyles: true,
    raw: true,
  });

  ws["!cols"] = [
    { wch: 10, s: { alignment: { horizontal: "center", vertical: "middle" } } },
    { wch: 10, s: { alignment: { horizontal: "center", vertical: "middle" } } },
  ];
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Xuất file
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const fileName = `exported_grades_class_${nameOfClass}_assignment_${assignmentName}.xlsx`;
  saveAs(data, fileName);
};
