import * as yup from 'yup';

export const schema = yup
  .object({
    username: yup.string()
      .required("Username is required")
      .oneOf(['emilys'], "Username must be 'emilys'"),
    email: yup
      .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  rememberMe: yup.boolean(),
})
.required();