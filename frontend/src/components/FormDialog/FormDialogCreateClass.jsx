import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fade from "@mui/material/Fade";

import { useDispatch, useSelector } from "react-redux";
import {
  createClassAction,
  editClassAction,
} from "../../redux/Actions/classAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function FormDialogCreateClass({
  open,
  handleClose,
  edit,
  classData,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, isError, isSuccess, classInfo } = useSelector(
    (state) => state.createClass
  );

  const { isLoading: isLoadingEdit, isError: isErrorEdit } = useSelector(
    (state) => state.editClass
  );

  const [formData, setFormData] = React.useState({
    name: "",
    part: "",
    topic: "",
    room: "",
  });

  const [isDirty, setIsDirty] = React.useState(false);

  React.useEffect(() => {
    // Update formData when edit or classData changes
    if (edit && classData) {
      setFormData({
        name: classData.name,
        part: classData.part,
        topic: classData.topic,
        room: classData.room,
      });
    }
  }, [edit, classData]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setIsDirty(true); // Set isDirty to true on any input change
  };

  const handleDialogClose = () => {
    // Clear input values when closing the dialog, but only if not in edit mode
    if (!edit) {
      setFormData({
        name: "",
        part: "",
        topic: "",
        room: "",
      });
      setIsDirty(false);
    }
    handleClose();
  };

  const isCreateButtonDisabled = formData.name === "" || !isDirty;

  const handleSubmit = () => {
    if (edit) {
      dispatch(editClassAction(classData.id, formData));
    } else {
      dispatch(createClassAction(formData));
    }
  };

  React.useEffect(() => {
    if (isError || isErrorEdit) {
      toast.error(isError || isErrorEdit);
      isError
        ? dispatch({ type: "CREATE_CLASS_RESET" })
        : dispatch({ type: "EDIT_CLASS_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "CREATE_CLASS_RESET" });

      navigate(`/class-details/${classInfo?.id}`);
    }
  }, [classInfo?.id, dispatch, isError, isSuccess, navigate, isErrorEdit]);

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      fullWidth={false}
      maxWidth="sm"
      TransitionComponent={Fade}
      transitionDuration={500} // Điều chỉnh thời gian hiển thị
      keepMounted
    >
      <DialogTitle sx={{ fontSize: "24px" }}>
        {edit ? "Edit classes" : "Create classes"}{" "}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Class name (Required)"
          type="text"
          fullWidth
          variant="standard"
          inputProps={{ style: { fontSize: 18 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
          style={{ marginBottom: "1rem" }}
          value={formData.name}
          onChange={handleInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="part"
          label="Part"
          type="text"
          fullWidth
          variant="standard"
          inputProps={{ style: { fontSize: 18 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
          style={{ marginBottom: "1rem" }}
          value={formData.part}
          onChange={handleInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="topic"
          label="Topic"
          type="text"
          fullWidth
          variant="standard"
          inputProps={{ style: { fontSize: 18 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
          style={{ marginBottom: "1rem" }}
          value={formData.topic}
          onChange={handleInputChange}
        />
        <TextField
          autoFocus
          margin="dense"
          id="room"
          label="Room"
          type="text"
          fullWidth
          variant="standard"
          inputProps={{ style: { fontSize: 18 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
          value={formData.room}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} sx={{ color: "#868e96" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          sx={{ color: "#5175e0" }}
          disabled={isCreateButtonDisabled || isLoading || isLoadingEdit}
        >
          {isLoading
            ? "Creating..."
            : isLoadingEdit
            ? "Saving..."
            : edit
            ? "Save"
            : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
