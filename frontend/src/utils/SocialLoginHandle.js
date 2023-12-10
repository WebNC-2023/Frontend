export const handleGoogleLogin = () => {
  // Thực hiện chuyển hướng đến trang Google Login
  window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/google`;
};

export const handleFacebookLogin = () => {
  window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/auth/facebook`;
};
