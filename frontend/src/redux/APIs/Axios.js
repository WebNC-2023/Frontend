import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: "https://webnc-2023.vercel.app",
  withCredentials: true,
});

// Request interceptor để thêm token vào mỗi request
Axios.interceptors.request.use(
  (config) => {
    //Lấy token từ cookies
    // const accessToken = Cookies.get("accessToken");
    // console.log(accessToken);
    // if (accessToken) {
    //   config.headers.Authorization = `Bearer ${accessToken}`;
    // }
    //console.log(document.cookie);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý refresh token khi token hết hạn
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Access token expired");
    // Kiểm tra nếu lỗi là do token hết hạn và chưa thử refresh token
    //console.log(error.response.status, originalRequest._retry, refreshToken);
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data === "Unauthorized"
    ) {
      try {
        console.log("call refresh token");
        const result = await Axios.get("/auth/refresh");
        return result;
      } catch (err) {
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("userInfo");
        }
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);

export default Axios;
