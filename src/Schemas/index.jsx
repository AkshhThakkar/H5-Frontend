import * as Yup from "yup";

const signUpSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Please enter your Password"), // confirm_password: Yup.string().required("<PASSWORD>"),
});

export default signUpSchema;
