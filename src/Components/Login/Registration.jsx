import { React, useState } from "react";
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
import { TbGenderBigender } from "react-icons/tb";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
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
  const headerStyle = { margin: 0 };
  const avatarStyle = { backgroundColor: "#3498db", color: "#ffffff" };
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

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3, "It's too short").required("Required"),
    email: Yup.string().email("Enter valid email").required("Required"),
    gender: Yup.string()
      .oneOf(["male", "female"], "Required")
      .required("Required"),
    mobile: Yup.number()
      .typeError("Enter valid Phone Number")
      .required("Required"),
    password: Yup.string()
      .min(8, "Password minimum length should be 8")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password not matched")
      .required("Required"),
    termsAndConditions: Yup.string().oneOf(
      ["true"],
      "Accept terms & conditions"
    ),
  });

  function handleRegister(payload) {
    axios
      .post("http://192.168.3.237:5760/api/user/register", payload)
      .then((res) => {
        console.log(res);

        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({ initialValues });

  const onSubmit = (values, action) => {
    handleRegister(values, action);
    console.log(
      "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
      values
    );
    action.resetForm();
  };

  console.log(
    "🚀 ~ file: Registration.jsx ~ line 25 ~ Registration ~ errors",
    errors
  );

  return (
    <Grid
      container
      alignItems="center"
      style={{ height: "100vh", width: "100vw" }}>
      <Paper style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar style={avatarStyle}>
            <AddCircleOutlineOutlinedIcon />
          </Avatar>
          <h2 style={headerStyle}>Sign Up</h2>
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
                  id="username"
                  autoComplete="on"
                  placeholder="Enter username"
                  fullWidth
                  required
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
                  id="email"
                  autoComplete="on"
                  label="Email"
                  placeholder="Enter your email"
                  helperText={<ErrorMessage name="email" />}
                  InputProps={{
                    startAdornment: (
                      <EmailRounded style={{ marginRight: "10px" }} />
                    ),
                  }}
                />
              </div>
              <div style={marginTop}>
                <TbGenderBigender />
                <FormControl component="fieldset">
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
                </FormControl>
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
                  id="mobile"
                  autoComplete="on"
                  placeholder="Enter your phone number"
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
                  id="password"
                  autoComplete="on"
                  placeholder="Enter password"
                  type={visible ? "text" : "password"}
                  fullWidth
                  required
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
                  id="confirmPassword"
                  type="password"
                  autoComplete="on"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  helperText={<ErrorMessage name="confirmPassword" />}
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
                <FormControlLabel
                  control={<Field as={Checkbox} name="termsAndConditions" />}
                  label="I accept the terms and conditions."
                />
                <FormHelperText>
                  <ErrorMessage name="termsAndConditions" />
                </FormHelperText>
              </div>
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
