import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Axios from "../../redux/APIs/Axios";

const ProtectedVerifyEmail = ({ children }) => {
  const { code } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    verifyEmailUrl();
  }, [code]);
  const verifyEmailUrl = async () => {
    try {
      const { data } = await Axios.post(`/auth/active-account/${code}`);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
  if (isError) {
    return <Navigate to="/404*" />;
  }

  return children;
};

export default ProtectedVerifyEmail;
