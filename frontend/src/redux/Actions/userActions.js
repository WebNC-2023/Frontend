import * as userConstants from "../Constants/userConstants";
import { ErrorsAction } from "../Protection";
import * as userApi from "../APIs/userServices";
import toast from "react-hot-toast";

// login action
export const loginAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const res = await userApi.loginService(datas);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: res });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// register action
export const registerAction = (data) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const res = await userApi.registerService(data);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: res });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};
