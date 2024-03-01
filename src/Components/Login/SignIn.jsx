import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import AvatarGIF from "../../Assets/Avatar.gif";
import {
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import {
  RemoveRedEyeRounded,
  RemoveRedEyeOutlined,
  Person,
  Lock,
} from "@material-ui/icons";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import axios from "axios";
import { useNavigate, NavLink } from "react-router-dom";
import { login } from "../../Redux/UsersSlice";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const SignIn = () => {
  const paperStyle = {
    padding: 20,
    height: "75vh",
    width: 300,
    margin: "0 auto",
    backgroundColor: "#f0f3f5",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleLogin(payload, props) {
    axios
      .post("http://192.168.3.237:5770/api/user/login", payload)
      .then((res) => {
        console.log("Response data:", res.data);
        if (res.data && res.data.data && res.data.data.token) {
          console.log("User logged in successfully");
          dispatch(login(res.data.data));
          navigate("/dashboard");
        } else {
          console.log("Invalid response format:", res.data);
          setErrorMessage("Invalid response format. Please try again.");
          props.resetForm();
        }
      })
      .catch((error) => {
        console.error("Error occurred during login:", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          console.log("Invalid credentials:", error.response);
          setErrorMessage(
            "Invalid username or password. Please refresh the page and try again."
          );
          props.resetForm();
        } else if (error && error.code === "ECONNREFUSED") {
          console.log("Failed to connect to the server:", error);
          setErrorMessage(
            "Failed to connect to the server. Please check your internet connection or try again later."
          );
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        } else {
          console.log("Unexpected error occurred:", error);
          setErrorMessage(
            "An unexpected error occurred while logging in. Please try again later."
          );
          setTimeout(() => {
            window.location.reload();
          }, 4000);
        }
      });
  }

  console.log("Rendering Login component");
  const { values, errors, handleChange } = useFormik({
    initialValues: initialValues,
  });
  const onSubmit = (values, props) => {
    console.log(values);
    handleLogin(values, props);
    console.log("🚀 ~ Login ~ values:", values);
    setTimeout(() => {}, 2000);
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  console.log(" file: index.jsx ~ Login ~ errors", errors);
  return (
    <Grid
      container
      alignItems="center"
      style={{ height: "100vh", width: "100vw", backgroundColor: "#1d2634" }}>
      <Paper style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar style={{ width: 80, height: 80 }}>
            <img
              src={AvatarGIF}
              alt="avatar"
              style={{ width: "100%", height: "100%" }}
            />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {(props) => (
            <Form>
              <div style={{ marginBottom: "20px" }}>
                <Field
                  as={TextField}
                  label="Username"
                  name="username"
                  id="username"
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
              <div style={{ marginBottom: "20px" }}>
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
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={{ margin: "15px 0", width: "100%" }}
                fullWidth>
                {props.isSubmitting ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Sign in"
                )}
              </Button>
              {errorMessage && (
                <Typography style={{ color: "red", marginTop: "10px" }}>
                  {errorMessage}
                </Typography>
              )}
            </Form>
          )}
        </Formik>
        <Typography>
          <NavLink
            to="/forgotpassword"
            style={{ textDecoration: "none", color: "#6A5ACD" }}>
            Forgot Password?
          </NavLink>
        </Typography>
        <Typography>
          Do you have an account ?
          <NavLink
            to="/register"
            style={{ textDecoration: "none", color: "#6A5ACD" }}
            onClick={() => handleChange("event", 1)}>
            Sign Up
          </NavLink>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default SignIn;
