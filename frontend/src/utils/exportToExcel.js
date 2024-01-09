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
export const exportGradesForAnAssignmentToExcel = (
  scores,
  nameOfClass,
  assignmentName
) => {
  const gradesDataToExport = scores.map((sc) => ({
    StudentId: sc.studentId,
    Grade:
      sc.score === null ? "" : sc.isReturned ? sc.score : `${sc.score} (draft)`,
  }));

  const ws = XLSX.utils.json_to_sheet(gradesDataToExport, {
    header: ["StudentId", "Grade"],
    widths: [10, 20],
    cellStyles: true,
    raw: true,
  });

  // Căn chỉnh văn bản về bên phải cho từng ô trong cột "Grade"
  const range = XLSX.utils.decode_range(ws["!ref"]);
  for (let R = range.s.r + 1; R <= range.e.r; ++R) {
    const cellAddress = XLSX.utils.encode_cell({ r: R, c: 1 }); // Cột "Grade" là cột thứ 1
    ws[cellAddress].s = {
      alignment: { horizontal: "right", vertical: "middle" },
    };
  }

  ws["!cols"] = [
    { wch: 10, s: { alignment: { horizontal: "center", vertical: "middle" } } },
    { wch: 20, s: { alignment: { horizontal: "right", vertical: "middle" } } }, // Đặt horizontal thành "right"
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
export const transformData = (data) => {
  // Tạo một đối tượng để lưu trữ kết quả
  const result = {};

  // Duyệt qua mảng dữ liệu gốc
  data.forEach((test) => {
    // Duyệt qua mảng điểm của từng bài kiểm tra
    test.scores.forEach((score) => {
      // Nếu chưa có thông tin về sinh viên trong đối tượng kết quả, tạo mới
      if (!result[score.studentId]) {
        result[score.studentId] = {
          studentId: score.studentId,
          fullName: score.fullName,
          scores: [],
        };
      }

      // Thêm thông tin điểm vào đối tượng kết quả
      result[score.studentId].scores.push({
        id: test.id,
        title: test.title,
        score: score.score,
        isReturned: score.isReturned,
      });
    });
  });

  // Chuyển đối tượng kết quả thành mảng
  const finalResult = Object.values(result);

  return finalResult;
};

export const exportGradesToExcel = (assignments) => {
  const newArray = transformData(assignments);

  // Tạo dòng tiêu đề
  const headerRow = ["User", "StudentId"];
  const assignmentColumns = newArray[0].scores.map((score) => score.title);
  headerRow.push(...assignmentColumns);
  const sheetData = [headerRow];

  // Thêm dữ liệu cho từng sinh viên
  newArray.forEach((student) => {
    const rowData = [student.fullName, student.studentId];

    // Thêm điểm số cho từng bài kiểm tra
    student.scores.forEach((score) => {
      const scoreValue = score.isReturned
        ? score.score
        : score.score !== null
        ? `${score.score} (draft)`
        : "";
      rowData.push(scoreValue);
    });

    sheetData.push(rowData);
  });

  // Thêm dòng Class Average
  const classAvgRow = ["Class Average", ""];
  assignmentColumns.forEach((assignmentTitle) => {
    const assignmentScores = newArray
      .flatMap((student) => student.scores)
      .filter((score) => score.title === assignmentTitle && score.isReturned);

    const totalScore = assignmentScores.reduce(
      (sum, score) => sum + score.score,
      0
    );
    const classAvg =
      assignmentScores.length > 0
        ? (totalScore / assignmentScores.length).toFixed(2)
        : "";
    classAvgRow.push(classAvg);
  });

  sheetData.push(classAvgRow);

  // Tạo sheet Excel từ mảng dữ liệu
  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  // Định dạng style cho ô (center align)
  ws["!rows"] = [
    { hpt: 20, hpx: 20, s: { bold: true, horizontal: "center" } }, // Hàng tiêu đề
    ...Array(sheetData.length - 2).fill({
      hpt: 15,
      hpx: 15,
      s: { horizontal: "center" },
    }), // Các hàng dữ liệu
  ];

  // Định dạng cột
  ws["!cols"] = [
    { width: 20 }, // Cột User
    { width: 15 }, // Cột StudentId
    ...assignmentColumns.map(() => ({ width: 15 })), // Các cột điểm
  ];

  // Định dạng dữ liệu
  const A1Cell = XLSX.utils.encode_cell({ c: 0, r: 0 }); // 'A1'
  ws[A1Cell]["t"] = "s"; // User

  const B1Cell = XLSX.utils.encode_cell({ c: 1, r: 0 }); // 'B1'
  ws[B1Cell]["t"] = "n"; // StudentId

  // Căn giữ ô tiêu đề và làm đậm
  ws["!rows"] = [{ hpt: 20, hpx: 20, s: { bold: true, horizontal: "center" } }]; // Chiều cao của hàng tiêu đề

  // Tạo workbook và thêm sheet vào workbook
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  // Xuất file Excel
  const excelBuffer = XLSX.write(wb, {
    bookType: "xlsx",
    type: "array",
  });
  const dataBlob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Tạo tên file và download
  const fileName = `report_grade_board.xlsx`;
  saveAs(dataBlob, fileName);
};

export const importGradesToAnAssignmentFormExcel = (file) => {
  return new Promise((resolve, reject) => {
    const allowedFileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];

    if (file && allowedFileTypes.includes(file.type)) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const dataArray = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Kiểm tra định dạng của dữ liệu
          const isValidFormat = dataArray.slice(1).every((row) => {
            console.log("Row", row);
            if (row.length === 1) {
              row[1] = "";
            }
            // Kiểm tra xem có đúng 2 giá trị và là số không
            if (
              row.length !== 2 ||
              typeof row[0] !== "number" ||
              (row[1] !== "" &&
                (typeof row[1] !== "number" || row[1] < 0 || row[1] > 100))
            ) {
              return false;
            }

            return true;
          });

          if (!isValidFormat) {
            reject(
              new Error(
                "Invalid data format. Please check the format of your Excel file.(typeOf Grade,Grade Scale [0,100], StudentId InCorrect,...) "
              )
            );
            return;
          }

          resolve(dataArray.slice(1));
        } catch (error) {
          reject(error);
        }
      };

      reader.readAsArrayBuffer(file);
    } else {
      reject(
        new Error("Invalid file type. Please upload an Excel (.xlsx) file.")
      );
    }
  });
};
