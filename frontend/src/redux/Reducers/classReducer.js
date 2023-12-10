import * as classConstants from "../Constants/classConstants";

// CREATE CLASS

export const classCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case classConstants.CREATE_CLASS_REQUEST:
      return { isLoading: true };
    case classConstants.CREATE_CLASS_SUCCESS:
      return { isLoading: false, classInfo: action.payload, isSuccess: true };
    case classConstants.CREATE_CLASS_FAIL:
      return { isLoading: false, isError: action.payload };
    case classConstants.CREATE_CLASS_RESET:
      return {};
    default:
      return state;
  }
};

// GET CLASSES

export const classGetReducer = (state = {}, action) => {
  switch (action.type) {
    case classConstants.GET_CLASSES_REQUEST:
      return { isLoading: true };
    case classConstants.GET_CLASSES_SUCCESS:
      return { isLoading: false, classes: action.payload, isSuccess: true };
    case classConstants.GET_CLASSES_FAIL:
      return { isLoading: false, isError: action.payload };
    case classConstants.GET_CLASSES_RESET:
      return {};
    default:
      return state;
  }
};
// EDIT CLASS

export const classEditReducer = (state = {}, action) => {
  switch (action.type) {
    case classConstants.EDIT_CLASS_REQUEST:
      return { isLoading: true };
    case classConstants.EDIT_CLASS_SUCCESS:
      return { isLoading: false, classInfo: action.payload, isSuccess: true };
    case classConstants.EDIT_CLASS_FAIL:
      return { isLoading: false, isError: action.payload };
    case classConstants.EDIT_CLASS_RESET:
      return {};
    default:
      return state;
  }
};
