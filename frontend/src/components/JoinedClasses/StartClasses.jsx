import "./StartClasses.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useState } from "react";
import FormDialogCreateClass from "../FormDialog/FormDialogCreateClass";
import FormDialogJoinClass from "../FormDialog/FormDialogJoinClass";

const StartClasses = () => {
  const [openDialogCreateClass, setOpenDialogCreateClass] = useState(false);
  const [openDialogJoinClass, setOpenDialogJoinClass] = useState(false);
  // Handle create & join Class

  const handleOpenDialogCreate = () => {
    setOpenDialogCreateClass(true);
  };

  const handleCloseDialogCreate = () => {
    setOpenDialogCreateClass(false);
  };

  const handleOpenDialogJoin = () => {
    setOpenDialogJoinClass(true);
  };
  const handleCloseDialogJoin = () => {
    setOpenDialogJoinClass(false);
  };

  return (
    <div className="start_classes">
      <div className="start_classes_img"></div>
      <div className="start_classes_text">
        <p>Add a class to get started</p>
        <Stack
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{
            marginTop: "1rem",
          }}
        >
          <Button variant="text" onClick={handleOpenDialogJoin}>
            Join the class
          </Button>
          <Button variant="contained" onClick={handleOpenDialogCreate}>
            Create classes
          </Button>
        </Stack>
      </div>
      {/* Dialog Create Class */}
      <FormDialogCreateClass
        open={openDialogCreateClass}
        handleClose={handleCloseDialogCreate}
      />

      {/* Dialog Join Class */}
      <FormDialogJoinClass
        open={openDialogJoinClass}
        handleClose={handleCloseDialogJoin}
      />
    </div>
  );
};

export default StartClasses;
