import Axios from "./Axios";

// *********************** PUBLIC API **************************
// truyền vào body sẽ là 1 object
// REGISTER NEW USER API CALL

export const registerService = async (user) => {
  const { data } = await Axios.post("/auth/sign-up", user);
  return data;
};

// Logout user Function
export const logoutService = () => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Login user API call
export const loginService = async (data) => {
  const res = await Axios.post("/auth/sign-in", data);
  if (res.data) {
    const { accessToken, refreshToken, ...user } = res.data.data;
    localStorage.setItem("userInfo", JSON.stringify(user));
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  }
};
