import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducer";
import fullNameUserReducer from "./Reducers/fullNameUserSlice";
import classroomPostReducer from "./Reducers/ClassroomPostSlice";
import classroomCommentReducer from "./Reducers/ClassroomCommentSlice";
const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  fullNameUser: fullNameUserReducer,
  classroomPost: classroomPostReducer,
  classroomComment: classroomCommentReducer
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo") ?? null;

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
