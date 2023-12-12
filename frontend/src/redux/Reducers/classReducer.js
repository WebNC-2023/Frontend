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

// jOIN CLASS
export const classJoinByCodeReducer = (state = {}, action) => {
  switch (action.type) {
    case classConstants.JOIN_CLASS_BYCODE_REQUEST:
      return { isLoading: true };
    case classConstants.JOIN_CLASS_BYCODE_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case classConstants.JOIN_CLASS_BYCODE_FAIL:
      return { isLoading: false, isError: action.payload };
    case classConstants.JOIN_CLASS_BYCODE_RESET:
      return {};
    default:
      return state;
  }
};

// UNSub Class
export const unSubClassReducer = (state = {}, action) => {
  switch (action.type) {
    case classConstants.UNSUB_CLASS_REQUEST:
      return { isLoading: true };
    case classConstants.UNSUB_CLASS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case classConstants.UNSUB_CLASS_FAIL:
      return { isLoading: false, isError: action.payload };
    case classConstants.UNSUB_CLASS_RESET:
      return {};
    default:
      return state;
  }
};

// delete class
export const deleteClassReducer = (state = {}, action) => {
  switch (action.type) {
    case classConstants.DELETE_CLASS_REQUEST:
      return { isLoading: true };
    case classConstants.DELETE_CLASS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case classConstants.DELETE_CLASS_FAIL:
      return { isLoading: false, isError: action.payload };
    case classConstants.DELETE_CLASS_RESET:
      return {};
    default:
      return state;
  }
};
