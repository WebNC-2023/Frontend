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
    .min(6, "Password More Than 6 Characters")
    .max(20, "Password Less Than 20 Characters"),
});
