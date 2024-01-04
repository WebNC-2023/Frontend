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
    assignments: [],
    assignmentDetail: {
      comments: [],
    },
    reviews: null,
    reviewDetails: null,
    reload: false,
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
      state.classroomAvatar = action.payload.classroomAvatar;
      state.assignments = action.payload.assignments;
      state.reviews = action.payload.reviews;
    },
    updateClassroomName: (state, action) => {
      state.name = action.payload.name;
    },
    addAssignment: (state, action) => {
      state.assignments = [...state.assignments, action.payload];
    },
    updateAssignmentDetails: (state, action) => {
      state.assignmentDetail = action.payload;
    },
    updateReviewDetails: (state, action) => {
      state.reviewDetails = action.payload;
    },
    updateReload: (state, action) => {
      state.reload = action.payload;
    },
  },
});
export const {
  updateClassroomDetailsInfo,
  updateClassroomName,
  addAssignment,
  updateAssignmentDetails,
  updateReviewDetails,
  updateReload,
} = ClassroomDetailsInfoSlice.actions;
export default ClassroomDetailsInfoSlice.reducer;
