import { React, useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
import {
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { EmailRounded } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const initialValues = {
  email: "",
};

const Forgot = () => {
  const paperStyle = {
    padding: 20,
    height: "50vh",
    width: 300,
    margin: "0 auto",
    backgroundColor: "#f0f3f5",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };

  const navigate = useNavigate();

  const avatarStyle = { backgroundColor: "#3498db", color: "#ffffff" };

  const btnstyle = { margin: "15px 0" };

  const [errorMessage, setErrorMessage] = useState("");

  function handleForgot() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      console.log(OTP);
      setOTP(OTP);

      axios
        .post("http://192.168.3.237:5760/api/pass/forgot-password", {
          OTP,
          recipient_email: email,
        })
        .then(() => navigate("/otp"))
        .catch(console.log);
      console.log();
      return;
    }
  }

  const onSubmit = (values, props) => {
    console.log(values);
  };
  const marginTop = { marginTop: 9 };

  const { handleChange } = useFormik({
    initialValues: initialValues,
  });

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <Grid
      container
      alignItems="center"
      style={{ height: "100vh", width: "100vw", backgroundColor: "#1d2634" }}>
      <Paper style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <h2>Reset Password</h2>
        </Grid>
        <Formik
          initialValues={initialValues}
          onSubmit={handleForgot}
          validationSchema={validationSchema}>
          {(props) => (
            <Form onClick={onsubmit}>
              <div style={{ marginBottom: "20px" }}>
                <div className="flex flex-row text-sm font-medium text-gray-400">
                  <p>We will send you a recovery code to your email</p>
                </div>
                <div style={marginTop}>
                  <Field
                    as={TextField}
                    fullWidth
                    name="email"
                    // onChange={(e) => setEmail(e.target.value)}
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
              </div>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={btnstyle}
                fullWidth>
                {props.isSubmitting ? "Loading" : "Send"}
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
          <Link href="/" onClick={() => handleChange("event", 1)}>
            Back
          </Link>
        </Typography>
      </Paper>
    </Grid>
  );
};

export default Forgot;
