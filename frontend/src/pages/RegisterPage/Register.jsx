import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-hot-toast";
import { RegisterValidation } from "../../components/Validation/userValidation";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { registerAction } from "../../redux/Actions/userActions";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { IconButton, InputAdornment } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Divider } from "@mui/material";

import Stack from "@mui/material/Stack";

import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import {
  handleFacebookLogin,
  handleGoogleLogin,
} from "../../utils/SocialLoginHandle";

const defaultTheme = createTheme();

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    isLoading,
    isError,
    isSuccess,
    userInfo: registerMess,
  } = useSelector((state) => state.userRegister);
  const { userInfo } = useSelector((state) => state.userLogin);
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    if (isSuccess) {
      toast.success(`${registerMess.message}`);

      // const redirectTimeout = setTimeout(() => {
      //   dispatch({ type: "USER_REGISTER_RESET" });
      //   navigate("/login");
      // }, 3000);

      // return () => clearTimeout(redirectTimeout);
    }
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_REGISTER_RESET" });
    }
  }, [dispatch, isError, isSuccess, navigate, userInfo, registerMess]);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: RegisterValidation,
    onSubmit: (data) => {
      dispatch(registerAction(data));
    },
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <div
        style={{
          backgroundColor: "#f0f3f5",
          width: "100%",
          height: "100vh",
          margin: "0",
          padding: "0",
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            backgroundColor: "white",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
            minHeight: "70vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "24px",
          }}
        >
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{ m: 1, bgcolor: "#5175e0", width: "50px", height: "50px" }}
            >
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 5 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={show ? "text" : "password"}
                    id="password"
                    autoComplete="new-password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => {
                              setShow(!show);
                            }}
                          >
                            {show ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isLoading}
                sx={{
                  mt: 3,
                  mb: 2,
                  bgcolor: "#5175e0",
                  "&:hover": {
                    bgcolor: "#5175e0",
                  },
                }}
              >
                {isLoading ? "Loading..." : "Sign up"}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link
                    href="/login"
                    variant="body2"
                    sx={{ color: "#5175e0" }}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              <Divider
                sx={{
                  mt: 2,
                  mb: 2,
                  color: "#868e96",
                  fontSize: "14px",
                }}
              >
                OR
              </Divider>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={3}
                style={{
                  gap: "0.5rem",
                }}
              >
                <FacebookLoginButton
                  style={{
                    background: "#5175e0",
                    gap: "1rem",
                    border: "1px solid #5175e0",
                  }}
                  activeStyle={{
                    background: "#3c5fc9",
                    boxShadow: "0 0 5px rgba(0, 0, 0, 0.05)",
                  }}
                  onClick={handleFacebookLogin}
                >
                  <span
                    style={{
                      marginLeft: "0.5rem",
                    }}
                  >
                    Continue with Facebook
                  </span>
                </FacebookLoginButton>
                <GoogleLoginButton
                  style={{
                    border: "1px solid #f5f5f5",
                  }}
                  onClick={handleGoogleLogin}
                >
                  <span
                    style={{
                      marginLeft: "0.5rem",
                    }}
                  >
                    Continue with Google{" "}
                  </span>
                </GoogleLoginButton>
              </Stack>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
