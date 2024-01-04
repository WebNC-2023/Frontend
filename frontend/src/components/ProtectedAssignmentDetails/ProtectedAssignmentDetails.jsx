import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";
import { useDispatch, useSelector } from "react-redux";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";
import { updateAssignmentDetails } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
import { update } from "../../redux/Reducers/fullNameUserSlice";

const ProtectedAssignmentDetails = ({ children }) => {
  const { assignmentId } = useParams();
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reload = useSelector((state)=>state.classroomDetailsInfo.reload);
  useEffect(() => {
    async function assignmentDetails() {
      dispatch(
        updateClassroomDetailsPendingUrl({
          pendingUrl: null,
          success: false,
        })
      );
      try {
        const res = await Axios({
          method: "GET",
          url: `/assignments/${assignmentId}`,
        });
        console.log('assignment details:', res.data);
        dispatch(
          updateClassroomDetailsPendingUrl({
            pendingUrl: null,
            success: true,
          })
        );
        dispatch(updateAssignmentDetails(res.data.data));
        dispatch(
          update({
            fullName: `${
              JSON.parse(localStorage.getItem("userInfo")).firstName ?? ""
            } ${JSON.parse(localStorage.getItem("userInfo")).lastName ?? ""}`,
            avatar:
              JSON.parse(localStorage.getItem("userInfo")).avatar === null
                ? null
                : `${process.env.REACT_APP_SERVER_BASE_URL}/files/${
                    JSON.parse(localStorage.getItem("userInfo")).avatar
                  }?${Date.now()}`,
          })
        );
        setLoading(false);
        setVerified(true);
      } catch (error) {
        if (error?.response?.data === "Unauthorized") {
          localStorage.removeItem("userInfo");
          dispatch(
            update({
              fullName: " ",
              avatar: "",
            })
          );
          navigate("/login");
        }
        setLoading(false);
      }
    }
    assignmentDetails();
  }, [assignmentId, navigate, dispatch, reload]);
  if (loading) {
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  } else {
    if (verified) return children;
    else return <Navigate to="/404*" />;
  }
};

export default ProtectedAssignmentDetails;
