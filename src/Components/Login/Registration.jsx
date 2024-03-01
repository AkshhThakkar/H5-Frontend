import { React, useState } from "react";
import RAvatar from "../../Assets/RAvatar.gif";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import {
  RemoveRedEyeRounded,
  RemoveRedEyeOutlined,
  Person,
  Lock,
  PhoneAndroidRounded,
  EmailRounded,
} from "@material-ui/icons";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage, useFormik } from "formik";
import { FormHelperText } from "@material-ui/core";
import * as Yup from "yup";
import axios from "axios";
import "./Registration.css";

const Signup = () => {
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const marginTop = { marginTop: 9 };
  const initialValues = {
    username: "",
    email: "",
    gender: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };

  const navigate = useNavigate();

  const [visible, setVisible] = useState(false);

  const [confirmvisible, setConfirmvisible] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, "Username is too short")
      .required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Gender is required")
      .required("Gender is required"),
    mobile: Yup.string()
      .matches(/^[0-9]+$/, "Invalid phone number")
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
    termsAndConditions: Yup.boolean()
      .oneOf([true], "Terms & conditions must be accepted")
      .required("Terms & conditions must be accepted"),
  });

  function handleRegister(payload) {
    axios
      .post("http://192.168.3.237:5770/api/user/register", payload)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          console.log(error.response.data);
          if (error.response.data.code === 11000) {
            setErrorMessage("Username or email or number already exists");
          } else {
            setErrorMessage("An error occurred. Please try again later.");
          }
        } else {
          // Handle other types of errors, or if error.response is undefined
          console.log(error);
          setErrorMessage("An error occurred. Please try again later.");
        }
      });
  }

  const { errors } = useFormik({ initialValues });

  const onSubmit = (values, action) => {
    handleRegister(values, action);
    console.log("Form submitted:", values);
    action.resetForm();
  };

  return (
    <Grid
      container
      alignItems="center"
      style={{ height: "100vh", width: "100vw" }}>
      <Paper style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar style={{ width: 70, height: 70 }}>
            <img
              src={RAvatar}
              alt="avatar"
              style={{ width: "100%", height: "100%" }}
            />
          </Avatar>
          <Typography
            variant="caption"
            gutterBottom
            style={{
              fontFamily: "Pacifico, cursive",
              fontSize: "14px",
              fontWeight: "bold",
            }}>
            Sign Up and Get Started!
          </Typography>
        </Grid>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}>
          {(props) => (
            <Form>
              <div style={marginTop}>
                <Field
                  as={TextField}
                  label="Username"
                  name="username"
                  autoComplete="on"
                  placeholder="Enter username"
                  fullWidth
                  required
                  error={props.touched.username && !!props.errors.username}
                  helperText={<ErrorMessage name="username" />}
                  InputProps={{
                    startAdornment: <Person style={{ marginRight: "10px" }} />,
                  }}
                />
              </div>
              <div style={marginTop}>
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  autoComplete="on"
                  label="Email"
                  placeholder="Enter your email"
                  error={props.touched.email && !!props.errors.email}
                  helperText={<ErrorMessage name="email" />}
                  InputProps={{
                    startAdornment: (
                      <EmailRounded style={{ marginRight: "10px" }} />
                    ),
                  }}
                />
              </div>
              <div style={marginTop}>
                <FormLabel component="legend">Gender</FormLabel>
                <Field
                  as={RadioGroup}
                  aria-label="gender"
                  name="gender"
                  style={{ display: "initial" }}>
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                </Field>
                <FormHelperText>
                  <ErrorMessage name="gender" />
                </FormHelperText>
              </div>
              <div style={marginTop}>
                <Field
                  as={TextField}
                  fullWidth
                  name="mobile"
                  label="Phone Number"
                  autoComplete="on"
                  placeholder="Enter your phone number"
                  error={props.touched.mobile && !!props.errors.mobile}
                  helperText={<ErrorMessage name="mobile" />}
                  InputProps={{
                    startAdornment: (
                      <PhoneAndroidRounded style={{ marginRight: "10px" }} />
                    ),
                  }}
                />
              </div>
              <div style={marginTop}>
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  autoComplete="on"
                  placeholder="Enter password"
                  type={visible ? "text" : "password"}
                  fullWidth
                  required
                  error={props.touched.password && !!props.errors.password}
                  helperText={<ErrorMessage name="password" />}
                  InputProps={{
                    startAdornment: <Lock style={{ marginRight: "10px" }} />,
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
                  fullWidth
                  name="confirmPassword"
                  autoComplete="on"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  type={confirmvisible ? "text" : "password"}
                  error={
                    props.touched.confirmPassword &&
                    !!props.errors.confirmPassword
                  }
                  helperText={<ErrorMessage name="confirmPassword" />}
                  InputProps={{
                    startAdornment: <Lock style={{ marginRight: "10px" }} />,
                    endAdornment: (
                      <div
                        onClick={() => setConfirmvisible(!confirmvisible)}
                        style={{ cursor: "pointer" }}>
                        {confirmvisible ? (
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
                <FormControlLabel
                  control={<Field as={Checkbox} name="termsAndConditions" />}
                  label="I accept the terms and conditions."
                />
                <FormHelperText>
                  <ErrorMessage name="termsAndConditions" />
                </FormHelperText>
              </div>
              {errorMessage && (
                <Typography variant="body2" color="error">
                  {errorMessage}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                disabled={props.isSubmitting}
                color="primary"
                style={marginTop}>
                {props.isSubmitting ? "Loading" : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
};

export default Signup;
