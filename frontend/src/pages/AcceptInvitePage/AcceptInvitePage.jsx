import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";
import "./AcceptInvitePage.css";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import Button from "@mui/material/Button";
const AcceptInvitePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const classId = searchParams.get("classId");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    async function sendAcceptInvite() {
      setLoading(true);
      setSuccess(false);
      try {
        const res = await Axios.post(`/classes/${classId}/accept`);
        console.log(res.data);
        setMessage(res.data.data.message);
        setLoading(false);
        setSuccess(true);
      } catch (error) {
        if (error?.response?.data === "Unauthorized") {
          navigate("/login");
        }
        console.log(error.response);
        setLoading(false);
        setMessage(error?.response?.data?.message);
        setSuccess(false);
      }
    }
    sendAcceptInvite();
  }, [classId, navigate]);
  if (loading)
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  else
    return (
      <div className="accept-invite-page-container">
        <div className="accept-invite-page">
          {success ? (
            <CheckCircleIcon
              sx={{
                width: "75px",
                height: "75px",
                color: "#3c9efe",
              }}
            />
          ) : (
            <ErrorIcon
              sx={{
                width: "75px",
                height: "75px",
                color: "red",
              }}
            />
          )}
          <p
            style={{
              userSelect: "none",
              fontSize: "1.25rem",
              lineHeight: "1.75rem",
              color: "#949495",
            }}
          >
            {message}
          </p>
          <Link to="/home-page">
            <Button variant="contained">Quay lại lớp học</Button>
          </Link>
        </div>
      </div>
    );
};

export default AcceptInvitePage;
