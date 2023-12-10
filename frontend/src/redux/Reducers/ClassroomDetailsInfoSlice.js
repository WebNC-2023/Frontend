import { createSlice } from "@reduxjs/toolkit";
export const ClassroomDetailsInfoSlice = createSlice({
  name: "classroomDetailsInfo",
  initialState: {
    name: "",
    topic: "",
    room: "",
    isOwner: false,
    people: [],
    owner: null,
  },
  reducers: {
    updateClassroomDetailsInfo: (state, action) => {
      state.name = action.payload.name;
      state.topic = action.payload.topic;
      state.room = action.payload.room;
      state.isOwner = action.payload.isOwner;
      state.people = action.payload.people;
      state.owner = action.payload.owner;
    },
  },
});
export const { updateClassroomDetailsInfo } = ClassroomDetailsInfoSlice.actions;
export default ClassroomDetailsInfoSlice.reducer;
