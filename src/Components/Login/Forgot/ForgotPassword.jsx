import React, { useState } from "react";
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
    height: "50vh",
    width: 300,
    margin: "0 auto",
    backgroundColor: "#f0f3f5",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };
  const avatarStyle = { backgroundColor: "#3498db", color: "#ffffff" };
  const btnContainerStyle = { textAlign: "center", marginTop: 20 }; // Added marginTop
  const marginTop = { marginTop: 15 };

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleForgotPassword = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.3.237:5760/api/pass/forgot-password",
        { email: values.email }
      );
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred. Please try again later.");
    }
    setLoading(false);
    setSubmitting(false);
  };

  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      style={{ height: "100vh", width: "100vw", backgroundColor: "#1d2634" }}>
      <Paper style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar style={avatarStyle}>
            <EmailRounded />
          </Avatar>
          <Typography variant="h5">Forgot Password</Typography>
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
              <div style={btnContainerStyle}>
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
          {message && <Typography>{message}</Typography>}
        </div>
        <div style={marginTop}>
          <Typography>
            <Link href="/"> Login? </Link>
          </Typography>
        </div>
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
