import { createSlice } from "@reduxjs/toolkit";
export const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    data: [],
    classrooms: [],
  },
  reducers: {
    updateData: (state, action) => {
      state.data = action.payload;
    },
    updateClassrooms: (state, action) => {
      state.classrooms = action.payload;
    },
  },
});
export const { updateData, updateClassrooms } = AdminSlice.actions;
export default AdminSlice.reducer;
