import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function SSOSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("accessToken", searchParams.get("accessToken"));
    localStorage.setItem("refreshToken", searchParams.get("refreshToken"));
    navigate("/");
  });

  return <></>;
}
