import React from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import {
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/UserSlice";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

const initialValues = {
  username: "",
  password: "",
};

const Login = () => {
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 300,
    margin: "0 auto",
  };

  const navigate = useNavigate();

  const avatarStyle = { backgroundColor: "#1bbd7e" };

  const btnstyle = { margin: "8px 0" };

  const dispatch = useDispatch();

  function handleLogin(payload) {
    axios
      .post("http://192.168.3.237:5760/api/user/login", payload)
      .then((res) => {
        console.log(res);
        dispatch(login(res.data.result));
        navigate("/dashboard");
      })
      .catch((error) => console.log(error));
  }

  const { values, errors, handleChange } = useFormik({
    initialValues: initialValues,
  });
  const onSubmit = (values, props) => {
    console.log(values);
    handleLogin(values);
    console.log("🚀 ~ Login ~ values:", values);
    setTimeout(() => {
      props.resetForm();
      props.setSubmitting(false);
    }, 2000);
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
      style={{ height: "100vh", width: "100vw" }}>
      <Paper style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          {(props) => (
            <Form>
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
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                id="password"
                autoComplete="on"
                placeholder="Enter password"
                type="password"
                fullWidth
                required
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={FormControlLabel}
                name="remember"
                control={<Checkbox color="primary" />}
                label="Remember me"
              />
              <Button
                // onClick={handleClick}
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
          <Link href="/forgotpassword">Forgot password ?</Link>
        </Typography>
        <Typography>
          Do you have an account ?
          <Link href="/register" onClick={() => handleChange("event", 1)}>
            Sign Up
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Login;
