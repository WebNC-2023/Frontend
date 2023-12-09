import { PuffLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        width: "100%",
        padding: "1rem 0.5rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <PuffLoader color="#5175e0" />
    </div>
  );
}

export default Loader;
