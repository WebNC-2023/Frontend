import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import * as classApi from "../../redux/APIs/classServices";
import { toast } from "react-toastify";

export default function AttendByLink() {
  const { classId } = useParams();
  console.log(classId);
  const navigate = useNavigate();

  const joinClass = async () => {
    try {
      await classApi.joinClass(classId);
      toast.success("Join class successfully!");
      navigate("/class-details/" + classId + "?tab=1");
    } catch (error) {
      toast.error("Some things went wrong!");
    }
  };

  useEffect(() => {
    joinClass();
  });

  return <></>;
}
