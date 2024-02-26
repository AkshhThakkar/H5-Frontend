// import React, { useState } from "react";
// import {
//   Grid,
//   Paper,
//   Avatar,
//   Typography,
//   TextField,
//   Button,
// } from "@material-ui/core";
// import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
// import { RemoveRedEyeRounded, RemoveRedEyeOutlined } from "@material-ui/icons";
// import { useNavigate } from "react-router-dom";
// import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
// import * as Yup from "yup";
// import axios from "axios";

// const ResetPassword = () => {
//   const paperStyle = {
//     height: 330,
//     padding: 20,
//     width: 300,
//     margin: "0 auto",
//     textAlign: "center",
//   };
//   const avatarStyle = {
//     backgroundColor: "#3498db",
//     color: "#ffffff",
//     margin: "0 auto",
//   };
//   const marginTop = { marginTop: 20 };
//   const initialValues = {
//     password: "",
//     confirmPassword: "",
//   };

//   const navigate = useNavigate();

//   const [visible, setVisible] = useState(false);
//   const [confirmVisible, setConfirmVisible] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const validationSchema = Yup.object().shape({
//     password: Yup.string()
//       .min(8, "Password should be at least 8 characters")
//       .required("Password is required"),
//     confirmPassword: Yup.string()
//       .oneOf([Yup.ref("password")], "Passwords do not match")
//       .required("Confirm password is required"),
//   });

//   function handleResetPassword(payload) {
//     axios
//       .post("http://192.168.3.237:5760/api/pass/reset-password", payload)
//       .then((res) => {
//         console.log(res);
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log(error.response.data);
//         setErrorMessage("An error occurred. Please try again later.");
//       });
//   }

//   const { errors } = useFormik({ initialValues });

//   const onSubmit = (values, action) => {
//     handleResetPassword(values, action);
//     console.log("Form submitted:", values);
//     action.resetForm();
//   };

//   return (
//     <Grid
//       container
//       alignItems="center"
//       style={{ height: "100vh", width: "100vw" }}>
//       <Paper style={paperStyle}>
//         <Avatar style={avatarStyle}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography variant="h5" style={{ margin: "10px 0" }}>
//           Reset Password
//         </Typography>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={onSubmit}>
//           {(props) => (
//             <Form>
//               <div style={marginTop}>
//                 <Field
//                   as={TextField}
//                   label="Password"
//                   name="password"
//                   type={visible ? "text" : "password"}
//                   autoComplete="new-password"
//                   placeholder="Enter your new password"
//                   fullWidth
//                   required
//                   error={props.touched.password && !!props.errors.password}
//                   helperText={<ErrorMessage name="password" />}
//                   InputProps={{
//                     startAdornment: (
//                       <LockOutlinedIcon style={{ marginRight: "10px" }} />
//                     ),
//                     endAdornment: (
//                       <div
//                         onClick={() => setVisible(!visible)}
//                         style={{ cursor: "pointer" }}>
//                         {visible ? (
//                           <RemoveRedEyeRounded />
//                         ) : (
//                           <RemoveRedEyeOutlined />
//                         )}
//                       </div>
//                     ),
//                   }}
//                 />
//               </div>
//               <div style={marginTop}>
//                 <Field
//                   as={TextField}
//                   label="Confirm Password"
//                   name="confirmPassword"
//                   type={confirmVisible ? "text" : "password"}
//                   autoComplete="new-password"
//                   placeholder="Confirm your new password"
//                   fullWidth
//                   required
//                   error={
//                     props.touched.confirmPassword &&
//                     !!props.errors.confirmPassword
//                   }
//                   helperText={<ErrorMessage name="confirmPassword" />}
//                   InputProps={{
//                     startAdornment: (
//                       <LockOutlinedIcon style={{ marginRight: "10px" }} />
//                     ),
//                     endAdornment: (
//                       <div
//                         onClick={() => setConfirmVisible(!confirmVisible)}
//                         style={{ cursor: "pointer" }}>
//                         {confirmVisible ? (
//                           <RemoveRedEyeRounded />
//                         ) : (
//                           <RemoveRedEyeOutlined />
//                         )}
//                       </div>
//                     ),
//                   }}
//                 />
//               </div>
//               {errorMessage && (
//                 <Typography variant="body2" color="error">
//                   {errorMessage}
//                 </Typography>
//               )}
//               <Button
//                 type="submit"
//                 variant="contained"
//                 disabled={props.isSubmitting}
//                 color="primary"
//                 fullWidth
//                 style={marginTop}>
//                 {props.isSubmitting ? "Loading" : "Reset Password"}
//               </Button>
//             </Form>
//           )}
//         </Formik>
//       </Paper>
//     </Grid>
//   );
// };

// export default ResetPassword;
import React, { useState } from "react";
import Reset from "../../../Assets/Reset.png";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import { RemoveRedEyeRounded, RemoveRedEyeOutlined } from "@material-ui/icons";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ResetPassword = () => {
  const paperStyle = {
    height: 330,
    padding: 20,
    width: 300,
    margin: "0 auto",
    textAlign: "center",
  };
  const marginTop = { marginTop: 20 };
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  function handleResetPassword(payload) {
    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    axios
      .post("http://192.168.3.237:5760/api/pass/reset", { ...payload, token })
      .then((res) => {
        console.log(res);
        setMessage("Password reset successfully!");
        setMessageColor("green");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error.response.data);
        setMessage("An error occurred. Please try again later.");
        setMessageColor("red");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  }

  const onSubmit = (values, action) => {
    handleResetPassword(values, action);
    console.log("Form submitted:", values);
    action.resetForm();
  };

  return (
    <Grid
      container
      alignItems="center"
      style={{ height: "100vh", width: "100vw" }}>
      <Paper style={paperStyle}>
        <Avatar style={{ width: 80, height: 80, margin: "0 auto" }}>
          <img
            src={Reset}
            alt="avatar"
            style={{ width: "100%", height: "100%" }}
          />
        </Avatar>

        <Typography variant="h5" style={{ margin: "10px 0" }}>
          Reset Password
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {(props) => (
            <Form>
              <div style={marginTop}>
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  type={visible ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your new password"
                  fullWidth
                  required
                  error={props.touched.password && !!props.errors.password}
                  helperText={<ErrorMessage name="password" />}
                  InputProps={{
                    startAdornment: (
                      <LockOutlinedIcon style={{ marginRight: "10px" }} />
                    ),
                    endAdornment: (
                      <div
                        onClick={() => setVisible(!visible)}
                        style={{ cursor: "pointer" }}>
                        {visible ? (
                          <RemoveRedEyeRounded />
                        ) : (
                          <RemoveRedEyeOutlined />
                        )}
                      </div>
                    ),
                  }}
                />
              </div>
              <div style={marginTop}>
                <Field
                  as={TextField}
                  label="Confirm Password"
                  name="confirmPassword"
                  type={confirmVisible ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Confirm your new password"
                  fullWidth
                  required
                  error={
                    props.touched.confirmPassword &&
                    !!props.errors.confirmPassword
                  }
                  helperText={<ErrorMessage name="confirmPassword" />}
                  InputProps={{
                    startAdornment: (
                      <LockOutlinedIcon style={{ marginRight: "10px" }} />
                    ),
                    endAdornment: (
                      <div
                        onClick={() => setConfirmVisible(!confirmVisible)}
                        style={{ cursor: "pointer" }}>
                        {confirmVisible ? (
                          <RemoveRedEyeRounded />
                        ) : (
                          <RemoveRedEyeOutlined />
                        )}
                      </div>
                    ),
                  }}
                />
              </div>
              {isSubmitting && (
                <CircularProgress
                  style={{ marginTop: 20 }}
                  color="primary"
                  size={24}
                />
              )}
              {!isSubmitting && (
                <Button
                  type="submit"
                  variant="contained"
                  disabled={props.isSubmitting}
                  color="primary"
                  fullWidth
                  style={marginTop}>
                  {props.isSubmitting ? "Loading" : "Reset Password"}
                </Button>
              )}
            </Form>
          )}
        </Formik>
        {message && (
          <Typography
            variant="body2"
            style={{ color: messageColor, marginTop: 10 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default ResetPassword;
