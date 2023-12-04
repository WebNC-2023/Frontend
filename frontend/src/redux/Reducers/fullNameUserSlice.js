import { createSlice } from "@reduxjs/toolkit";

let firstUserName;
let lastUserName;
let userAvatar;

if (localStorage.getItem("userInfo")) {
  if (localStorage.getItem("userInfo").firstName) {
    if (
      localStorage.getItem("userInfo").firstName !== null &&
      localStorage.getItem("userInfo").firstName !== undefined
    ) {
      firstUserName = localStorage.getItem("userInfo").firstName;
    } else firstUserName = "";
  } else firstUserName = "";
  if (localStorage.getItem("userInfo").lastName)
    lastUserName = localStorage.getItem("userInfo").lastName;
  else lastUserName = "";
  if (localStorage.getItem("userInfo").avatar)
    userAvatar = localStorage.getItem("userInfo").avatar;
  else userAvatar = "";
} else {
  firstUserName = "";
  lastUserName = "";
  userAvatar = "";
}
export const fullNameUserSlice = createSlice({
  name: "fullNameUser",
  initialState: {
    fullName: `${firstUserName} ${lastUserName}`,
    avatar: userAvatar,
    pending: false,
  },
  reducers: {
    update: (state, action) => {
      state.fullName = action.payload.fullName;
      state.avatar = action.payload.avatar;
      state.pending = false;
    },
    updateStart: (state) => {
      state.pending = true;
    },
  },
});

export const { update, updateStart } = fullNameUserSlice.actions;
export default fullNameUserSlice.reducer;
