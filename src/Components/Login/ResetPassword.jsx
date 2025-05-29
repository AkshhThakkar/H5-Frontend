import React, { useState } from "react";
import Reset from "../../assets/Reset.gif";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  RemoveRedEyeRounded,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const ResetPassword = () => {
  const paperStyle = {
    height: 380,
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
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password should be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });
  const token = new URLSearchParams(window.location.search);
  const id = new URLSearchParams(window.location.search);

  const handleResetPassword = (payload) => {
    setIsSubmitting(true);
    const newPassword = payload.password;

    axios
      .post("http://localhost:3000/api/pass/reset", {
        token: token.get("token"),
        id: id.get("id"),
        newPassword: newPassword,
      })
      .then((res) => {
        console.log(res);
        setMessage("Password reset successfully!");
        setMessageColor("green");
        setSnackbarOpen(true);
        setTimeout(() => {
          navigate("/");
        }, 1500);
      })
      .catch((error) => {
        console.log("Error:", error);
        setMessage("An error occurred. Please try again later.");
        setMessageColor("red");
        setSnackbarOpen(true);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const onSubmit = (values, action) => {
    handleResetPassword(values);
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
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message={message}
          ContentProps={{
            style: {
              backgroundColor: messageColor === "green" ? "green" : "red",
              fontWeight: "bold",
            },
          }}
        />
      </Paper>
    </Grid>
  );
};

export default ResetPassword;
