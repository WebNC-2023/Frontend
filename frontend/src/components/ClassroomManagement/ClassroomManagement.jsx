import { Avatar, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import ClassroomAction from "./ClassroomAction";
function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
        }}
        csvOptions={{
          fileName: "Classrooms",
          delimiter: ";",
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const ClassroomManagement = () => {
  const classrooms = useSelector((state) => state.admin.classrooms);
  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 150 },
      {
        field: "avatar",
        headerName: "Avatar",
        width: 100,
        renderCell: (params) => (
          <Avatar
            src={
              params.row.avatar !== null
                ? `${process.env.REACT_APP_SERVER_BASE_URL}/files/${params.row.avatar}`
                : ""
            }
          />
        ),
        sortable: false,
        filterable: false,
        disableExport: true,
      },
      { field: "name", headerName: "Name", width: 300 },
      {
        field: "dateCreated",
        headerName: "Date Created",
        width: 350,
        renderCell: (params) =>
          moment(params.row.dateCreated).format("HH:mm:ss DD-MM-YYYY"),
      },
      {
        field: "isActive",
        headerName: "Is Active",
        width: 200,
        type: "boolean",
        editable: false,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => <ClassroomAction {...{ params }} />,
        disableExport: true,
      },
    ],
    []
  );
  return (
    <>
      <Box
        sx={{
          height: 445,
          width: "100%",
        }}
      >
        <DataGrid
          columns={columns}
          rows={classrooms}
          getRowId={(row) => row.id}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5 } },
          }}
          getRowSpacing={(params) => ({
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5,
          })}
          sx={{
            [`& .${gridClasses.row}`]: {
              bgcolor: (theme) =>
                theme.palette.mode === "light" ? grey[200] : grey[900],
            },
            ".MuiDataGrid-cell:focus": {
              outline: "none",
            },
            // pointer cursor on ALL rows
            "& .MuiDataGrid-row:hover": {
              cursor: "pointer",
            },
          }}
          // processRowUpdate={(a, b) => {
          //   if (a.isActive !== classrooms.find((x) => x.id === a.id).isActive) {
          //     setRowId(a.id);
          //   } else {
          //     setRowId(null);
          //   }
          //   return a;
          // }}
          // onCellEditStart={() => {
          //   setRowId(null);
          // }}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Box>
    </>
  );
};

export default ClassroomManagement;
