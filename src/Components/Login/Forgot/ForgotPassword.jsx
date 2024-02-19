import React, { useState } from "react";
import { Field, Formik } from "formik";
import {
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  CircularProgress,
} from "@material-ui/core";
import { EmailRounded } from "@material-ui/icons";
import { Grid } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 300,
    margin: "0 auto",
    backgroundColor: "#f0f3f5",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };
  const avatarStyle = { backgroundColor: "#3498db", color: "#ffffff" };
  const btnstyle = { margin: "15px 0" };
  const marginTop = { marginTop: 60 };
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.3.237:5760/api/pass/forgot-password",
        { email }
      );
      setMessage(response.data.message);
      setTimeout(() => {
        setLoading(false);
        navigate("/reset");
      }, 3000); // 3 seconds delay
    } catch (error) {
      setLoading(false);
      setMessage(error.response.data.message);
    }
  };

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
          <h2>Forgot password</h2>
        </Grid>
        <p>We will send you a recovery code to your email</p>
        <Formik>
          <Field
            as={TextField}
            fullWidth
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="on"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            InputProps={{
              startAdornment: <EmailRounded style={{ marginRight: "10px" }} />,
            }}
          />
        </Formik>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleForgotPassword}
          disabled={loading}>
          {loading ? (
            <CircularProgress size={24} color="white" />
          ) : (
            "Reset Password"
          )}
        </Button>
        {message && <Typography>{message}</Typography>}
        <div style={marginTop}>
          <Typography>
            <Link href="/">Back </Link>
          </Typography>
        </div>
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
