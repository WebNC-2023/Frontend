import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { Tooltip } from "@mui/material";
import * as classApi from "../../redux/APIs/classServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose }) {
  const [classCode, setClassCode] = React.useState("");
  const [classCodeError, setClassCodeError] = React.useState(false);
  const navigate = useNavigate();

  const handleClassCodeChange = (event) => {
    const inputValue = event.target.value;
    setClassCode(inputValue);

    // Check the condition for the class code
    const isValidClassCode = /^[a-zA-Z0-9]{7,12}$/.test(inputValue);
    setClassCodeError(!isValidClassCode);
  };

  const handleJoinClick = async () => {
    try {
      await classApi.joinClass(classCode);
      toast.success("Join class successfully!");
      navigate("/class-details/" + classCode);
    } catch (error) {
      toast.error("Some things went wrong!");
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar
        sx={{
          position: "relative",
          backgroundColor: "white",
          color: "#777e85",
          padding: "0 10px",
        }}
      >
        <Toolbar>
          <Tooltip title="Close">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              size="medium"
            >
              <CloseIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Join the class
          </Typography>
          <Button
            variant="contained"
            disabled={classCodeError || !classCode.trim()}
            sx={{ textTransform: "none", padding: "6px 22px" }}
            onClick={handleJoinClick}
          >
            Join
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "80%",
        }}
      >
        <Card
          style={{
            maxWidth: 600,
            width: "100%",
            padding: "20px 20px 60px 20px",
            boxShadow: "none",
            border: "2px solid #ced4da ",
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              Class Code
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Ask your teacher for the class code and enter it here.
            </Typography>
            <TextField
              id="classCode"
              label="Class Code"
              variant="outlined"
              style={{ marginTop: "1rem", width: "50%" }}
              value={classCode}
              onChange={handleClassCodeChange}
              error={classCodeError}
              helperText={
                classCodeError
                  ? "The class code has 7-12 characters including letters and numbers, without spaces or symbols"
                  : ""
              }
            />
          </CardContent>
        </Card>
        <Box
          sx={{
            textAlign: "left",
            marginTop: "20px",
            display: "flex",
            gap: "10px",
            flexDirection: "column",
          }}
        >
          <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
            How to log in with class code{" "}
          </Typography>
          <Typography>• Use a licensed account</Typography>
          <Typography>
            • Use a class code of 5-7 letters or numbers, with no spaces or
            symbols
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
}
