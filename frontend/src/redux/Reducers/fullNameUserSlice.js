import {createSlice} from "@reduxjs/toolkit";

let firstUserName =
    JSON.parse(localStorage.getItem("userInfo"))?.firstName || "";
  let lastUserName =
    JSON.parse(localStorage.getItem("userInfo"))?.lastName || "";
    let userAvatar = JSON.parse(localStorage.getItem("userInfo"))?.avatar || "";
export const fullNameUserSlice = createSlice({
    name: "fullNameUser",
    initialState: {
        fullName: `${firstUserName} ${lastUserName}`,
        avatar: userAvatar,
        pending: false
    },
    reducers: {
        update: (state, action) => {
            state.fullName = action.payload.fullName;
            state.avatar = action.payload.avatar;
            state.pending = false;
        },
        updateStart: (state) => {
            state.pending = true;
        }
    }
});

export const {update, updateStart} = fullNameUserSlice.actions;
export default fullNameUserSlice.reducer;