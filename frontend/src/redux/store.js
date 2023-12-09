import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducer";
import fullNameUserReducer from "./Reducers/fullNameUserSlice";
import classroomPostReducer from "./Reducers/ClassroomPostSlice";
import classroomCommentReducer from "./Reducers/ClassroomCommentSlice";
import * as Class from "./Reducers/classReducer";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  fullNameUser: fullNameUserReducer,
  classroomPost: classroomPostReducer,
  classroomComment: classroomCommentReducer,
  createClass: Class.classCreateReducer,
  classes: Class.classGetReducer,
  editClass: Class.classEditReducer,
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
