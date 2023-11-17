import { logoutAction } from "./Actions/userActions";

export const ErrorsAction = (error, dispatch, action) => {
  const message =
    error.response && error.response.data.message
      ? error.response.data.message
      : error.message;
  console.log(message);
  if (message === "Not authorized, no token") {
  }
  return dispatch({ type: action, payload: message });
};
