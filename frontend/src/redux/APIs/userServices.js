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
  return null;
};

// Login user API call
export const loginService = async (user) => {
  const { data } = await Axios.post("/auth/sign-in", user);
  console.log(data);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data.data));
  }
  return data.data;
};
