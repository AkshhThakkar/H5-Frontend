import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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

const Login = () => {
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  function handleLogin(payload, props) {
    axios
      .post("http://192.168.182.191:3000/api/user/login", payload)
      .then((res) => {
        console.log("Response data:", res.data);
        if (res.data && res.data.result && res.data.result.token) {
          console.log("User logged in successfully");
          dispatch(login(res.data.result));
          setSnackbarMessage("Login Successful");
          setSnackbarOpen(true);
          setTimeout(() => {
            navigate("/dashboard"); // Redirect to dashboard after successful login
          }, 1500);
          props.resetForm(); // Log before resetForm
          console.log("Form reset successful"); // Add this log statement
        } else {
          console.log("Invalid response format:", res.data);
          setErrorMessage("Unexpected response format. Please try again.");
          props.resetForm(); // Log before resetForm
          console.log("Form reset unsuccessful"); // Add this log statement
        }
      })
      .catch((error) => {
        console.error("Error occurred during login:", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          console.log("Invalid credentials:", error.response);
          setErrorMessage("Invalid username or password. Please try again.");
          props.resetForm(); // Log before resetForm
          console.log("Form reset successful"); // Add this log statement
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

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });

  // Custom Snackbar component
  const CustomSnackbar = ({ message }) => {
    return (
      <Paper
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          padding: 10,
          backgroundColor: "#5f72f3",
          color: "white",
          borderRadius: 8,
          zIndex: 9999,
        }}>
        {message}
      </Paper>
    );
  };

  return (
    <Grid
      container
      alignItems="center"
      style={{ height: "100vh", width: "100vw", backgroundColor: "#222" }}>
      <Paper style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar style={{ width: 80, height: 80, marginBottom: "20px" }}>
            <img
              src={AvatarGIF}
              alt="avatar"
              style={{ width: "100%", height: "100%" }}
            />
          </Avatar>
          <h2 style={{ marginBottom: "20px", color: "#222" }}>Sign In</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={(values, props) => handleLogin(values, props)}
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
        <Typography style={{ color: "#000" }}>
          Do you have an account ?
          <NavLink
            to="/register"
            style={{ textDecoration: "none", color: "#6A5ACD" }}>
            Sign Up
          </NavLink>
        </Typography>
      </Paper>
      {snackbarOpen && <CustomSnackbar message={snackbarMessage} />}
    </Grid>
  );
};

export default Login;
