import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducer";
import fullNameUserReducer from "./Reducers/fullNameUserSlice";
import classroomPostReducer from "./Reducers/ClassroomPostSlice";
import classroomCommentReducer from "./Reducers/ClassroomCommentSlice";
import classroomDetailsInfoReducer from "./Reducers/ClassroomDetailsInfoSlice";
import classroomDetailsPendingReducer from "./Reducers/classroomDetailsPendingSlice";
import AdminReducer from "./Reducers/AdminSlice";
import * as Class from "./Reducers/classReducer";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  fullNameUser: fullNameUserReducer,
  classroomPost: classroomPostReducer,
  classroomComment: classroomCommentReducer,
  admin: AdminReducer,
  createClass: Class.classCreateReducer,
  classes: Class.classGetReducer,
  classroomDetailsInfo: classroomDetailsInfoReducer,
  classroomDetailsPending: classroomDetailsPendingReducer,
  editClass: Class.classEditReducer,
  joinClassByCode: Class.classJoinByCodeReducer,
  unSubClass: Class.unSubClassReducer,
  deleteClass: Class.deleteClassReducer,
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
