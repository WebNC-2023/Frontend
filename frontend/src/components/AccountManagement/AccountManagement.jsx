import { Avatar, Box } from "@mui/material";
import { grey } from "@mui/material/colors";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import AccountAction from "./AccountAction";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport
        printOptions={{
          hideFooter: true,
          hideToolbar: true,
        }}
        csvOptions={{
          fileName: "Accounts",
          delimiter: ";",
          utf8WithBom: true,
        }}
      />
    </GridToolbarContainer>
  );
}

const AccountManagement = () => {
  const data = useSelector((state) => state.admin.data);
  const [rowId, setRowId] = useState(null);
  const columns = useMemo(
    () => [
      { field: "id", headerName: "Id", width: 100 },
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
      { field: "firstName", headerName: "First Name", width: 200 },
      { field: "lastName", headerName: "Last Name", width: 200 },
      { field: "email", headerName: "Email", width: 300 },
      {
        field: "isBlocked",
        headerName: "Is Blocked",
        width: 200,
        type: "boolean",
        editable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        renderCell: (params) => (
          <AccountAction {...{ params, rowId, setRowId }} />
        ),
        disableExport: true,
      },
    ],
    [rowId]
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
          rows={data.filter(
            (element) => element.email !== "learners.admin@gmail.com"
          )}
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
          processRowUpdate={(a, b) => {
            if (a.isBlocked !== data.find((x) => x.id === a.id).isBlocked) {
              setRowId(a.id);
            } else {
              setRowId(null);
            }
            return a;
          }}
          onCellEditStart={() => {
            setRowId(null);
          }}
          slots={{
            toolbar: CustomToolbar,
          }}
        />
      </Box>
    </>
  );
};

export default AccountManagement;
