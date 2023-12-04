import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: "https://webnc-2023.vercel.app",
  withCredentials: true,
});

let count = 0;

// Response interceptor để xử lý refresh token khi token hết hạn
Axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log("Access token expired");
    // Kiểm tra nếu lỗi là do token hết hạn và chưa thử refresh token
    //console.log(error.response.status, originalRequest._retry, refreshToken);
    if (error.response.status === 401 && count <= 5) {
      try {
        count++;
        console.log("call refresh token");
        const result = await axios({
          url: "https://webnc-2023.vercel.app/auth/refresh",
          method: "GET",
          withCredentials: true,
        });
        return Axios(error.config);
      } catch (err) {
        if (err.response && err.response.status === 400) {
          localStorage.removeItem("userInfo");
          window.location = "/login";
        }
        return Promise.reject(err);
      }
    }
    window.location = "/home-page";
  }
);

export default Axios;
