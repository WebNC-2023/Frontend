import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";
import "./AcceptInvitePage.css";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import * as userApi from "../../redux/APIs/userServices";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { ToastContainer, toast } from "react-toastify";
const AcceptInvitePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get("classId");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const classroomName = useSelector((state) => state.classroomDetailsInfo.name);
  const handleClickAccountChange = () => {
    userApi.logoutService();
    dispatch(
      update({
        fullName: " ",
        avatar: "",
      })
    );
    navigate("/login");
  };
  const handleClickAcceptInvite = () => {
    async function sendAcceptInvite() {
      setLoading(true);
      dispatch(
        updateClassroomDetailsPendingUrl({
          pendingUrl: null,
          success: false,
        })
      );
      try {
        const res = await Axios.post(`/classes/${classId}/accept`);
        dispatch(
          updateClassroomDetailsPendingUrl({
            pendingUrl: null,
            success: true,
          })
        );
        toast.success(`${res.data.message}`, {
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate(`/class-details/${classId}/everyone`);
        }, 4000);
      } catch (error) {
        if (error?.response?.data === "Unauthorized") {
          dispatch(
            updateClassroomDetailsPendingUrl({
              pendingUrl: `/accept-invite?classId=${classId}`,
              success: false,
            })
          );
          toast.error(`${error?.response?.data}`, {
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        } else if (
          error?.response?.data?.message ===
          "Not have invite to join this class"
        ) {
          toast.error(`${error?.response?.data?.message}`, {
            autoClose: 3000,
          });
          setTimeout(() => {
            navigate("/login");
          }, 4000);
        } else navigate("/login");
      }
    }
    sendAcceptInvite();
  };
  return (
    <>
      <Dialog open>
        <DialogTitle>Đồng ý tham gia lớp học?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn đã được mời tham gia lớp học {`"${classroomName}"`}. Bạn đã đăng
            nhập với tư cách{" "}
            <b>{`${JSON.parse(localStorage.getItem("userInfo")).firstName} ${
              JSON.parse(localStorage.getItem("userInfo")).lastName
            } (${JSON.parse(localStorage.getItem("userInfo")).email})`}</b>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            disabled={loading ? true : false}
            onClick={handleClickAccountChange}
          >
            Chuyển đổi tài khoản
          </Button>
          <Button
            variant="contained"
            disabled={loading ? true : false}
            onClick={handleClickAcceptInvite}
          >
            {loading ? "Đang gửi" : "Chấp nhận"}
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position="top-right"
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        autoClose={3000}
      />
    </>
  );
};

export default AcceptInvitePage;
