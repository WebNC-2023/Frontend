import { useParams, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
const ProtectedResetPassword = ({ children }) => {
  const { code } = useParams();
  const [loading, setLoading] = useState(true);
  const [validate, setValidate] = useState(false);
  const location = useLocation();
  useEffect(() => {
    async function sendValidateResetPasswordCode() {
      setLoading(true);
      setValidate(false);
      const res = await axios({
        method: "POST",
        url: "https://webnc-2023.vercel.app/auth/validate-reset-password-code",
        withCredentials: true,
        data: {
          resetPasswordCode: code,
        },
      });
      return res;
    }
    sendValidateResetPasswordCode()
      .then((res) => {
        setLoading(false);
        setValidate(true);
      })
      .catch((err) => {
        if (err.response.data.message === "Reset password code is invalid!") {
          setLoading(false);
          setValidate(false);
        }
      });
  }, [code]);
  if (loading)
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  else {
    if (validate) return children;
    else return <Navigate to="/forgot-password" state={{ from: location }} replace />;
  }
};

export default ProtectedResetPassword;
