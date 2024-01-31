import * as Yup from "yup";

const SignupSchema = Yup.object({
  username: Yup.string().min(2).required("Please enter your username "),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required("Please fill the password"),
  //   confirm_password: Yup.string()
  //     .required()
  //     .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default SignupSchema;
