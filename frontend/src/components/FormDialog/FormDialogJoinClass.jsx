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
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { joinClassCodeAction } from "../../redux/Actions/classAction";
import { DataContext } from "../../contexts/DataContext";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog({ open, handleClose }) {
  const { language } = React.useContext(DataContext);
  const [classCode, setClassCode] = React.useState("");
  const [classCodeError, setClassCodeError] = React.useState(false);

  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.joinClassByCode
  );

  const navigate = useNavigate();

  const handleClassCodeChange = (event) => {
    const inputValue = event.target.value;
    setClassCode(inputValue);

    // Check the condition for the class code
    const isValidClassCode = /^[a-zA-Z0-9]{7,12}$/.test(inputValue);
    setClassCodeError(!isValidClassCode);
  };

  const handleJoinClick = () => {
    dispatch(joinClassCodeAction(classCode));
  };

  React.useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "JOIN_CLASS_BYCODE_RESET" });
    }
    if (isSuccess) {
      navigate("/class-details/" + classCode + "?tab=1");
      dispatch({ type: "JOIN_CLASS_BYCODE_RESET" });
    }
  }, [dispatch, isError, classCode, isSuccess, navigate]);

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
          <Tooltip title={language === "English" ? "Close" : "Đóng"}>
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
            {language === "English" ? "Join the class" : "Tham gia lớp học"}
          </Typography>
          <Button
            variant="contained"
            disabled={classCodeError || !classCode.trim() || isLoading}
            sx={{ textTransform: "none", padding: "6px 22px" }}
            onClick={handleJoinClick}
          >
            {isLoading
              ? language === "English"
                ? "Loading..."
                : "Đang tải..."
              : language === "English"
              ? "Join"
              : "Tham gia"}
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
              {language === "English" ? "Class Code" : "Mã lớp"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {language === "English"
                ? "Ask your teacher for the class code and enter it here."
                : "Đề nghị giáo viên của bạn cung cấp mã lớp rồi nhập mã đó vào đây."}
            </Typography>
            <TextField
              id="classCode"
              label={language === "English" ? "Class Code" : "Mã lớp"}
              variant="outlined"
              style={{ marginTop: "1rem", width: "50%" }}
              value={classCode}
              onChange={handleClassCodeChange}
              error={classCodeError}
              helperText={
                classCodeError
                  ? language === "English"
                    ? "The class code has 7-12 characters including letters and numbers, without spaces or symbols"
                    : "Mã lớp có 7-12 ký tự bao gồm chữ cái và số, không chứa khoảng cách và ký hiệu"
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
            {language === "English"
              ? "How to log in with class code"
              : "Cách đăng nhập bằng mã lớp học"}
          </Typography>
          <Typography>
            {language === "English"
              ? "• Use a licensed account"
              : "• Sử dụng tài khoản được cấp phép"}
          </Typography>
          <Typography>
            {language === "English"
              ? "• Use a class code of 7-12 letters or numbers, with no spaces or symbols"
              : "• Sử dụng mã lớp học gồm 5-7 chữ cái hoặc số, không có dấu cách hoặc ký hiệu"}
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
}
