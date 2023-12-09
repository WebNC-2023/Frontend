import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
const InviteToClassroom = () => {
  const [open, setOpen] = React.useState(false);
  const [content, setContent] = React.useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Tooltip title="Mời giáo viên">
        <IconButton color="primary" size="large" onClick={handleClickOpen}>
          <PersonAddAltOutlinedIcon sx={{ color: "#1967d2" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} fullWidth>
        <DialogTitle>Mời giáo viên</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nhập email"
            type="email"
            fullWidth
            variant="standard"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <DialogContentText
            sx={{
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              padding: "10px 0",
              userSelect: "none",
            }}
          >
            Giáo viên mà bạn thêm có thể làm mọi thứ bạn làm, trừ xóa lớp học.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Huỷ</Button>
          <Button
            onClick={handleClose}
            disabled={content === "" ? true : false}
          >
            Mời
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InviteToClassroom;
