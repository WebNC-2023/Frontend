import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useContext, useState } from "react";
import Axios from "../../redux/APIs/Axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateData } from "../../redux/Reducers/AdminSlice";
import EditIcon from "@mui/icons-material/Edit";
import { DataContext } from "../../contexts/DataContext";
const AccountAction = ({ params }) => {
  const { language } = useContext(DataContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(params.row.isBlocked.toString());

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setValue(params.row.isBlocked.toString());
    setOpen(false);
  };

  const dispatch = useDispatch();
  const handleSubmit = () => {
    let domain = "";
    if (value === "true") domain = "block";
    else domain = "unblock";
    async function sendConfigAccount() {
      setLoading(true);
      try {
        const res = await Axios({
          url: `/users/${params.row.id}/${domain}`,
          method: "POST",
        });
        const res1 = await Axios.get("/users");
        dispatch(updateData(res1.data.data));
        setLoading(false);
        setOpen(false);
        toast.success(language==="English"?`${res.data.message}`:"Cập nhật thông tin thành công", { autoClose: 3000 });
      } catch (error) {
        setLoading(false);
        setOpen(false);
        toast.error(`${error}`, { autoClose: 3000 });
      }
    }
    sendConfigAccount();
  };
  return (
    <Box
      sx={{
        m: 1,
        position: "relative",
      }}
    >
      <Fab
        color="primary"
        sx={{
          width: 35,
          height: 35,
        }}
        // disabled={params.id !== rowId || loading}
        // onClick={handleSubmit}
        onClick={handleClickOpen}
      >
        <EditIcon />
      </Fab>
      <Dialog fullWidth open={open}>
        <DialogTitle>
          {language === "English" ? "Edit" : "Chỉnh sửa"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="id"
            label="Id"
            type="text"
            variant="standard"
            value={params.row.id}
            disabled
          />
          <TextField
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            variant="standard"
            value={params.row.firstName}
            disabled
          />
          <TextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            variant="standard"
            value={params.row.lastName}
            disabled
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email"
            type="email"
            fullWidth
            disabled
            value={params.row.email}
            variant="standard"
          />
          <FormControl sx={{ marginTop: 1, fontSize: "1rem" }}>
            <FormLabel id="demo-controlled-radio-buttons-group">
              Is Blocked
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={value}
              onChange={handleChange}
              sx={{ fontSize: "0.875rem" }}
            >
              <FormControlLabel
                value="false"
                control={<Radio />}
                label="False"
              />
              <FormControlLabel value="true" control={<Radio />} label="True" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            {language === "English" ? "Cancel" : "Hủy"}
          </Button>
          <Button
            disabled={
              value === params.row.isBlocked.toString() || loading
                ? true
                : false
            }
            onClick={handleSubmit}
          >
            {loading
              ? language === "English"
                ? "Updating..."
                : "Đang cập nhật..."
              : language === "English"
              ? "Update"
              : "Cập nhật"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AccountAction;
