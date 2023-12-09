import { createSlice } from "@reduxjs/toolkit";
export const ClassroomDetailsInfoSlice = createSlice({
  name: "classroomDetailsInfo",
  initialState: {
    name: "",
    topic: "",
    room: "",
  },
  reducers: {
    updateClassroomDetailsInfo: (state, action) => {
      state.name = action.payload.name;
      state.topic = action.payload.topic;
      state.room = action.payload.room;
    },
  },
});
export const { updateClassroomDetailsInfo } = ClassroomDetailsInfoSlice.actions;
export default ClassroomDetailsInfoSlice.reducer;
