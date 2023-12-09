import { createSlice } from "@reduxjs/toolkit";
export const classroomDetailsPendingSlice = createSlice({
  name: "classroomDetailsPending",
  initialState: {
    pendingUrl: null,
    success: false
  },
  reducers: {
    updateClassroomDetailsPendingUrl: (state, action) => {
      state.pendingUrl = action.payload.pendingUrl;
      state.success = action.payload.success;
    },
  },
});
export const { updateClassroomDetailsPendingUrl } =
  classroomDetailsPendingSlice.actions;
export default classroomDetailsPendingSlice.reducer;
