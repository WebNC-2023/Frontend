import { createSlice } from "@reduxjs/toolkit";
export const ClassroomPostSlice = createSlice({
  name: "classroomPost",
  initialState: {
    posts: [
      {
        postId: 0,
        username: "",
        dateSubmitted: "",
        avatar: "",
        postContent: "",
        boldStyle: false,
        italicStyle: false,
        underlineStyle: false,
      },
    ],
  },
  reducers: {
    update: (state, action) => {
      state.posts = [...state.posts, action.payload];
    },
  },
});
export const { update } = ClassroomPostSlice.actions;
export default ClassroomPostSlice.reducer;
