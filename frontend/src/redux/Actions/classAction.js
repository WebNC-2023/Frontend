import * as classConstants from "../Constants/classConstants";
import { ErrorsAction } from "../Protection";
import * as classApi from "../APIs/classServices";

import toast from "react-hot-toast";

// create Class action
export const createClassAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.CREATE_CLASS_REQUEST });
    const res = await classApi.createClassService(datas);
    dispatch({ type: classConstants.CREATE_CLASS_SUCCESS, payload: res });
    toast.success("Create class successfully !");
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
    toast.success("Edit class successfully !");
    dispatch(getClassesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.EDIT_CLASS_FAIL);
  }
};

// join class by code action
export const joinClassCodeAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.JOIN_CLASS_BYCODE_REQUEST });
    const res = await classApi.joinClass(id);
    dispatch({ type: classConstants.JOIN_CLASS_BYCODE_SUCCESS, payload: res });
    toast.success("Join class successfully !");
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.JOIN_CLASS_BYCODE_FAIL);
  }
};

// unSub class by code action
export const unSubClassAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.UNSUB_CLASS_REQUEST });
    const res = await classApi.unSubClass(id);
    dispatch({ type: classConstants.UNSUB_CLASS_SUCCESS, payload: res });
    toast.success("Unsubscribe class successfully !");
    dispatch(getClassesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.UNSUB_CLASS_FAIL);
  }
};

// delete class action

export const deleteClassAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: classConstants.DELETE_CLASS_REQUEST });
    const res = await classApi.deleteClass(id);
    dispatch({ type: classConstants.DELETE_CLASS_SUCCESS, payload: res });
    toast.success("Delete class successfully !");
    dispatch(getClassesAction());
  } catch (error) {
    ErrorsAction(error, dispatch, classConstants.DELETE_CLASS_FAIL);
  }
};
