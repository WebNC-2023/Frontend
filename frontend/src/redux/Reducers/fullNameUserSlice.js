import {createSlice} from "@reduxjs/toolkit";

let firstUserName =
    JSON.parse(localStorage.getItem("userInfo"))?.firstName || "";
  let lastUserName =
    JSON.parse(localStorage.getItem("userInfo"))?.lastName || "";
export const fullNameUserSlice = createSlice({
    name: "fullNameUser",
    initialState: {
        fullName: `${firstUserName} ${lastUserName}`
    },
    reducers: {
        update: (state, action) => {
            state.fullName = action.payload.fullName;
        }
    }
});

export const {update} = fullNameUserSlice.actions;
export default fullNameUserSlice.reducer;