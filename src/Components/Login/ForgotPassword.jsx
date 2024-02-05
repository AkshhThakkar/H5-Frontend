import React from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { Formik, useFormik } from "formik";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";

const initialValues = {
  password: "",
  confirmpassword: "",
};

export const ForgotPassword = () => {
  const paperStyle = {
    padding: 20,
    height: "73vh",
    width: 300,
    margin: "0 auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "8px 0" };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({ initialValues: initialValues });
  const onSubmit = (values, props) => {
    console.log(values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);

    const validationSchema = Yup.object().shape({
      password: Yup.string()
        .min(8, "Password minimum length should be 8")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password not matched")
        .required("Required"),
    });

    return (
      <Grid>
        <Paper style={paperStyle}>
          <Grid align="center">
            <Avatar style={avatarStyle}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Reset Password</h2>
          </Grid>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            {(props) => (
              <Form>
                <Field
                  as={TextField}
                  label="Password"
                  name="password"
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  required
                  helperText={<ErrorMessage name="password" />}
                />
                <Field
                  as={TextField}
                  fullWidth
                  name="confirmPassword"
                  type="password"
                  autoComplete="on"
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  helperText={<ErrorMessage name="confirmPassword" />}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting}
                  style={btnstyle}
                  fullWidth>
                  {props.isSubmitting ? "Loading" : "Sign in"}
                </Button>
              </Form>
            )}
          </Formik>
          <Typography>
            <Link href="/">Back</Link>
          </Typography>
        </Paper>
      </Grid>
    );
  };
};
