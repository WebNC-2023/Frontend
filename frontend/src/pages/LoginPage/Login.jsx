import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { toast } from "react-toastify";
import { LoginValidation } from "../../components/Validation/userValidation";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import * as userApi from "../../redux/APIs/userServices";

import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";
import {
  handleFacebookLogin,
  handleGoogleLogin,
} from "../../utils/SocialLoginHandle";

const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const [show, setShow] = React.useState(false);
  const { isError, isSuccess, userInfo } = useSelector(
    (state) => state.userLogin
  );
  const pendingUrl = useSelector(
    (state) => state.classroomDetailsPending.pendingUrl
  );

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginValidation,
    onSubmit: async (data) => {
      setIsLoading(true);
      try {
        await userApi.loginService(data);
        toast.success("Sign in successfully!");
        setTimeout(() => {
          if (pendingUrl === null) {
            if (data.email === "learners.admin@gmail.com") {
              navigate("/admin?tab=1");
            } else navigate("/home-page");
          } else {
            navigate(pendingUrl);
          }
        }, 100);
      } catch (error) {
        toast.error("Email or password incorrect!");
      }
      setIsLoading(false);
    },
  });

  React.useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "USER_LOGIN_RESET" });
    }
    if (isSuccess) {
      if (pendingUrl === null) {
        console.log("1");
        navigate("/home-page");
      } else {
        navigate(pendingUrl);
      }
    }
  }, [userInfo, isSuccess, isError, navigate, dispatch, pendingUrl]);
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
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={formik.handleSubmit}
              sx={{ mt: 5 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type={show ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
                sx={{ mb: 2 }}
              />
              <Link
                href="/forgot-password"
                variant="body2"
                style={{
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontStyle: "italic",
                }}
              >
                {"Forgot Password?"}
              </Link>

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
                {isLoading ? "Loading..." : "Sign In"}
              </Button>
              <Grid container>
                {/* <Grid item xs></Grid> */}
                <Grid item>
                  <Link
                    href="/register"
                    variant="body2"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {"Don't have an account? Sign Up"}
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
                <GoogleLoginButton
                  style={{
                    border: "1px solid #f5f5f5",
                  }}
                  iconSize="20px"
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
                  iconSize="20px"
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
              </Stack>
            </Box>
          </Box>
        </Container>
      </div>
    </ThemeProvider>
  );
}
