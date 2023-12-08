import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Fade from "@mui/material/Fade";

export default function FormDialogCreateClass({
  open,
  handleClose,
  edit,
  classData,
}) {
  const [formData, setFormData] = React.useState({
    className: "",
    part: "",
    topic: "",
    room: "",
  });

  const [isDirty, setIsDirty] = React.useState(false);

  React.useEffect(() => {
    // Update formData when edit or classData changes
    if (edit && classData) {
      setFormData({
        className: classData.className || "",
        part: classData.part || "",
        topic: classData.topic || "",
        room: classData.room || "",
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
    // Clear input values when closing the dialog
    setFormData({
      className: "",
      part: "",
      topic: "",
      room: "",
    });
    setIsDirty(false);
    handleClose();
  };

  const isCreateButtonDisabled = formData.className === "" || !isDirty;

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
          id="className"
          label="Class name (Required)"
          type="text"
          fullWidth
          variant="standard"
          inputProps={{ style: { fontSize: 18 } }} // font size of input text
          InputLabelProps={{ style: { fontSize: 18 } }} // font size of input label
          style={{ marginBottom: "1rem" }}
          value={formData.className}
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
          onClick={() => {
            console.log(formData);
          }}
          sx={{ color: "#5175e0" }}
          disabled={isCreateButtonDisabled}
        >
          {edit ? "Save" : "Create"}{" "}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
