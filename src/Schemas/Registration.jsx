import * as Yup from "yup";

const SignupSchema = Yup.object({
  username: Yup.string().min(3).required("Please enter your Username "),
  email: Yup.string().email().required("Please enter your Email"),
  gender: Yup.string().required("Please select your Gender"),
  DOB: Yup.string().required("Please enter your Date of Birth"),
  password: Yup.string().min(6).required("Please fill the Password"),
  //   confirm_password: Yup.string()
  //     .required()
  //     .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default SignupSchema;
