import * as yup from "yup";

// register validation
export const RegisterValidation = yup.object().shape({
  firstName: yup
    .string()
    .required("Please Enter Your First Name")
    .max(10, "First Name Less Than 10 Characters"),
  lastName: yup
    .string()
    .required("Please Enter Your Last Name")
    .max(20, "Last Name Less Than 20 Characters"),
  email: yup.string().email().required("Please Enter Your Email").trim(),
  password: yup
    .string()
    .required("Please Enter Your Password")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
});

// login validation
export const LoginValidation = yup.object().shape({
  email: yup.string().email().required("Please Enter Your Email").trim(),
  password: yup
    .string()
    .required("Please Enter Your Password")
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters"),
});
