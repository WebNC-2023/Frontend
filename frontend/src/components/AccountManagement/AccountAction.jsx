import { Save } from "@mui/icons-material";
import { Box, CircularProgress, Fab } from "@mui/material";
import { green } from "@mui/material/colors";
import { useState } from "react";
import Axios from "../../redux/APIs/Axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateData } from "../../redux/Reducers/AdminSlice";
const AccountAction = ({ params, rowId, setRowId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    let domain = "";
    if (params.row.isBlocked) domain = "block";
    else domain = "unblock";
    async function sendConfigAccount() {
      setLoading(true);
      try {
        const res = await Axios({
          url: `/users/${params.row.id}/${domain}`,
          method: "POST",
        });
        setRowId(null);
        const res1 = await Axios.get("/users");
        dispatch(updateData(res1.data.data));
        setLoading(false);
        toast.success(`${res.data.message}`, { autoClose: 3000 });
      } catch (error) {
        setLoading(false);
        setRowId(null);
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
          width: 40,
          height: 40,
        }}
        disabled={params.id !== rowId || loading}
        onClick={handleSubmit}
      >
        <Save />
      </Fab>
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: green[500],
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
};

export default AccountAction;
