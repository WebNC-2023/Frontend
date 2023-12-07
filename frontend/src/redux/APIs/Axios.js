import axios from "axios";
const Axios = axios.create({
  // baseURL: process.env.REACT_APP_SERVER_BASE_URL,
  baseURL: "https://webnc-2023.vercel.app",
  withCredentials: true,
});

// Tạm thời ẩn cái interceptor này, tại vì nếu window.location = '/login' thì mọi lỗi về chuyển về login hết

// Response interceptor để xử lý refresh token khi token hết hạn
// Axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     console.log("Access token expired");
//     window.location = "/login";
//     // Kiểm tra nếu lỗi là do token hết hạn và chưa thử refresh token
//     //console.log(error.response.status, originalRequest._retry, refreshToken);
//     // if (
//     //   error.response &&
//     //   error.response.status === 401 &&
//     //   error.response.data === "Unauthorized"
//     // ) {
//     // try {
//     //   console.log("call refresh token");
//     //   await Axios.get("/auth/refresh");
//     //   return Axios.request(error.config);
//     // } catch (err) {
//     //   localStorage.removeItem("userInfo");
//     //   setTimeout(
//     //     () => (window.location.href = "http://localhost:3000/login"),
//     //     3000
//     //   );

//     //   console.log(err);

//     //   return Promise.reject(err);
//     // }
//     // }
//     // return Promise.reject(error);
//   }
// );

export default Axios;
