import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";
import { useDispatch } from "react-redux";
import { update } from "../../redux/Reducers/fullNameUserSlice";
import { updateClassroomDetailsPendingUrl } from "../../redux/Reducers/classroomDetailsPendingSlice";
import { updateReviewDetails } from "../../redux/Reducers/ClassroomDetailsInfoSlice";
const ProtectedReviewDetails = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);
  const { reviewId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    async function getData() {
      try {
        const res = await Axios({
          method: "GET",
          url: `/scores/reviews/${reviewId}`,
        });
        dispatch(updateReviewDetails(res.data.data));
        dispatch(
          updateClassroomDetailsPendingUrl({
            pendingUrl: null,
            success: true,
          })
        );
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
    getData();
  }, [dispatch, navigate, reviewId]);
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

export default ProtectedReviewDetails;
