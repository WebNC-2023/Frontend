import axios from "axios";

const Axios = axios.create({
  baseURL: "https://webnc-2023.vercel.app",

  withCredentials: true,
});

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
      !originalRequest._isRetry &&
      error.response.data === "Unauthorized"
    ) {
      console.log("refresh");
      originalRequest._isRetry = true;
      try {
        // Thực hiện refresh token
        const response = await Axios.get("/auth/refresh");

        // Kiểm tra trạng thái của response từ refresh token
        console.log(response);
        return Axios(originalRequest);
      } catch (refreshError) {
        // Nếu refresh token cũng lỗi, đăng xuất người dùng hoặc thực hiện các xử lý khác
        console.log("Refresh token failed:", refreshError);
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
