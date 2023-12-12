import * as classConstants from "../Constants/classConstants";
import { ErrorsAction } from "../Protection";
import * as classApi from "../APIs/classServices";

import { toast } from "react-toastify";

// create Class action
export const createClassAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.CREATE_CLASS_REQUEST });
    const res = await classApi.createClassService(datas);
    dispatch({ type: classConstants.CREATE_CLASS_SUCCESS, payload: res });
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.CREATE_CLASS_FAIL);
  }
};

// Get classes action
export const getClassesAction = () => async (dispatch) => {
  try {
    dispatch({ type: classConstants.GET_CLASSES_REQUEST });
    const res = await classApi.getClassesService();
    dispatch({ type: classConstants.GET_CLASSES_SUCCESS, payload: res });
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.GET_CLASSES_FAIL);
  }
};

// create Class action
export const editClassAction = (id, data) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.EDIT_CLASS_REQUEST });
    const res = await classApi.editClassService(id, data);
    dispatch({ type: classConstants.EDIT_CLASS_SUCCESS, payload: res });
    toast.success("edited successfully !");
    dispatch(getClassesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.EDIT_CLASS_FAIL);
  }
};
