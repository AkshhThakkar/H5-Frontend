import React, { useState } from "react";
import ForgotGIF from "../../Assets/Forgot.gif";
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { EmailRounded } from "@material-ui/icons";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const paperStyle = {
    padding: 20,
    height: "55vh",
    width: 300,
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };

  const marginTop = { marginTop: 15 };

  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleForgotPassword = async (values, { setSubmitting }) => {
    console.log("Submitting forgot password request with email:", values.email);
    try {
      const response = await axios.post(
        "http://192.168.3.237:5770/api/pass/forgot-password",
        { email: values.email }
      );
      console.log("Forgot password request successful:", response.data);
      setMessage(response.data.message);
      setMessageColor("green");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 404) {
        console.log("User not found.");
        setMessage("User not found");
      } else {
        console.log("An error occurred. Please try again later.");
        setMessage("An error occurred. Please try again later.");
      }
      setMessageColor("red");
    }
    setSubmitting(false);
  };

  return (
    <Grid
      container
      alignItems="center"
      style={{ height: "100vh", width: "100vw", backgroundColor: "#1d2634" }}>
      <Paper style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar style={{ width: 80, height: 80 }}>
            <img
              src={ForgotGIF}
              alt="avatar"
              style={{ width: "100%", height: "100%" }}
            />
          </Avatar>
          <Typography variant="h5" style={{ marginBottom: "10px" }}>
            Forgot Password
          </Typography>
        </Grid>
        <p>We will send you a password recovery link to your email</p>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleForgotPassword}>
          {(props) => (
            <Form>
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
              <div style={{ textAlign: "center", marginTop: 20 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={props.isSubmitting}
                  color="primary"
                  style={{ width: "100%" }}>
                  {props.isSubmitting ? (
                    <CircularProgress size={24} color="primary" />
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        <div style={marginTop}>
          {message && (
            <Typography style={{ color: messageColor }}>{message}</Typography>
          )}
        </div>
        <div style={marginTop}>
          <Typography>
            <Link to="/"> Login? </Link>
          </Typography>
        </div>
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
