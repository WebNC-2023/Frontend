import { createSlice } from "@reduxjs/toolkit";
export const ClassroomDetailsInfoSlice = createSlice({
  name: "classroomDetailsInfo",
  initialState: {
    id: "",
    name: "",
    topic: "",
    room: "",
    isOwner: false,
    people: [],
    owner: null,
    classroomAvatar: null,
    assignments: []
  },
  reducers: {
    updateClassroomDetailsInfo: (state, action) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.topic = action.payload.topic;
      state.room = action.payload.room;
      state.isOwner = action.payload.isOwner;
      state.people = action.payload.people;
      state.owner = action.payload.owner;
      state.classroomAvatar = action.payload.classroomAvatar
    },
    updateClassroomName: (state, action) => {
      state.name = action.payload.name;
    },
    addAssignment: (state, action) => {
      state.assignments = [...state.assignments, action.payload];
    }
  },
});
export const { updateClassroomDetailsInfo, updateClassroomName, addAssignment } =
  ClassroomDetailsInfoSlice.actions;
export default ClassroomDetailsInfoSlice.reducer;
