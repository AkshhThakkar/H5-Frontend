import * as Yup from "yup";

const signUpSchema = Yup.object({
  name: Yup.string().min(3).max(25).required("Username is required"),
  password: Yup.string().min(6).required("Please enter your Password"), // confirm_password: Yup.string().required("<PASSWORD>"),
});

export default signUpSchema;
