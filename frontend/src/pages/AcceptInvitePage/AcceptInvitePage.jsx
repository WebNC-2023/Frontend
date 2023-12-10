import { useParams } from "react-router-dom";

const AcceptInvitePage = () => {
  const { classId } = useParams();
  return <>{classId}</>;
};

export default AcceptInvitePage;
