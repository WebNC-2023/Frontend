import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
const ContentTab4 = ({ loadingClassDetails, ClassDetailsSuccess }) => {
  return (
    <>
      {loadingClassDetails ? (
        <></>
      ) : ClassDetailsSuccess ? (
        <></>
      ) : (
        <div
          style={{
            paddingTop: "105px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            rowGap: "20px",
          }}
        >
          <p>Không tìm thấy lớp</p>
          <Link to="/home-page">
            <Button variant="contained">Quay lại lớp học</Button>
          </Link>
        </div>
      )}
    </>
  );
};

export default ContentTab4;
