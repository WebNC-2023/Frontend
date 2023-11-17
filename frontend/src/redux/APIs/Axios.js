import axios from "axios";

const Axios = axios.create({
  baseURL: "https://webnc-2023.vercel.app",
  withCredentials: true,
});

export default Axios;
