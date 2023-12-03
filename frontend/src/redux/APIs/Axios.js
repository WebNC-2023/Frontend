import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: "https://webnc-2023.vercel.app",
  withCredentials: true,
});

// Request interceptor để thêm token vào mỗi request
Axios.interceptors.request.use(
  (config) => {
    // Lấy token từ cookies
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

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
    const originalRequest = error.config;
    // Kiểm tra nếu lỗi là do token hết hạn và chưa thử refresh token
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      originalRequest.headers.Authorization
    ) {
      originalRequest._retry = true;

      try {
        // Thực hiện refresh token
        const response = await Axios.get("/auth/refresh");
        // Lấy token từ cookies sau khi đã refresh
        const newAccessToken = Cookies.get("accessToken");

        // Thực hiện lại request gốc với token mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return Axios(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token cũng lỗi, đăng xuất người dùng hoặc thực hiện các xử lý khác
        console.log("Refresh token failed");
        // Đăng xuất hoặc thực hiện các xử lý khác
        const res = await Axios.post("/auth/sign-out");
        localStorage.removeItem("userInfo");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default Axios;
