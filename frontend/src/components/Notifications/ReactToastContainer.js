import { ToastContainer } from "react-toastify";

export default function ReactToastContainer() {
  return (
    <ToastContainer
      position="top-right"
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      autoClose={3000}
    />
  );
}
