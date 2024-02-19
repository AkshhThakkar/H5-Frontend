// import React, { useState } from "react";
// import axios from "axios";

// const ResetPassword = () => {
//   const [email, setEmail] = useState("");
//   const [token, setToken] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleResetPassword = async () => {
//     try {
//       const response = await axios.post("http://192.168.3.237:5760/api/user/", {
//         email,
//         token,
//         newPassword,
//       });
//       setMessage(response.data.message);
//     } catch (error) {
//       setMessage(error.response.data.message);
//     }
//   };

//   return (
//     <div>
//       <h2>Reset Password</h2>
//       <input
//         type="email"
//         placeholder="Enter your email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="text"
//         placeholder="Enter reset token"
//         value={token}
//         onChange={(e) => setToken(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Enter new password"
//         value={newPassword}
//         onChange={(e) => setNewPassword(e.target.value)}
//       />
//       <button onClick={handleResetPassword}>Reset Password</button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default ResetPassword;
import React, { useState } from "react";
import { TextField, Button, Typography, Paper, Grid } from "@material-ui/core";
import { LockOutlined as LockOutlinedIcon } from "@material-ui/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const paperStyle = {
    padding: 20,
    height: 300,
    width: 300,
    margin: "0 auto",
    backgroundColor: "#f0f3f5",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
  };
  const avatarStyle = { backgroundColor: "#3498db", color: "#ffffff" };
  const btnstyle = { marginTop: 20 }; // Adjusted margin for the button
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.3.237:5760/api/pass/reset-password",
        { password, confirmPassword }
      );
      setMessage(response.data.message);
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 5000); // 5 seconds delay
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
          <LockOutlinedIcon style={{ fontSize: 40 }} />
          <Typography variant="h5">Reset password</Typography>
          <TextField
            fullWidth
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ margin: "10px 0" }}
          />
          <TextField
            fullWidth
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{ margin: "10px 0" }}
          />
        </Grid>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          style={btnstyle}
          fullWidth
          onClick={handleResetPassword}
          disabled={loading}>
          {loading ? "Loading..." : "Reset Password"}
        </Button>
        {message && (
          <Typography style={{ color: "green", marginTop: 10 }}>
            {message}
          </Typography>
        )}
      </Paper>
    </Grid>
  );
};

export default ResetPassword;
