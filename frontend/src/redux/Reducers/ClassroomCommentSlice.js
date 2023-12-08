import { createSlice } from "@reduxjs/toolkit";
export const ClassroomCommentSlice = createSlice({
  name: "classroomComments",
  initialState: {
    comments: [
      {
        postId: 0,
        commentId: 0,
        username: "",
        dateSubmitted: "",
        avatar: "",
        commentContent: "",
        boldStyle: false,
        italicStyle: false,
        underlineStyle: false,
      },
    ],
  },
  reducers: {
    update: (state, action) => {
      state.comments = [...state.comments, action.payload];
    },
  },
});
export const { update } = ClassroomCommentSlice.actions;
export default ClassroomCommentSlice.reducer;
