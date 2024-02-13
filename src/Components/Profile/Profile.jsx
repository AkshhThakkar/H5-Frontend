import React from "react";
import { Grid, Paper, Avatar, Typography, Button } from "@material-ui/core";
import { Person, EmailRounded, PhoneAndroidRounded } from "@material-ui/icons";

const Profile = ({ user }) => {
  const paperStyle = { padding: 20, width: 300, margin: "0 auto" };
  const headerStyle = { margin: 10 };
  const avatarStyle = { backgroundColor: "#3498db", color: "#ffffff" };
  const containerStyle = {
    height: "100vh",
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 9999,
    background: "#fff",
    overflowY: "auto",
  };

  if (!user) {
    return null; // Render nothing if user is not defined
  }

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={containerStyle}>
      <Paper style={paperStyle}>
        <Grid container direction="column" alignItems="center" spacing={2}>
          <Avatar style={avatarStyle}>
            <Person />
          </Avatar>
          <Typography variant="h5" style={headerStyle}>
            Profile
          </Typography>
          <Typography variant="subtitle1">Username: {user.username}</Typography>
          <Typography variant="subtitle1">Email: {user.email}</Typography>
          <Typography variant="subtitle1">
            Gender: {user.gender.charAt(0).toUpperCase() + user.gender.slice(1)}
          </Typography>
          <Typography variant="subtitle1">
            Phone Number: {user.mobile}
          </Typography>
          <Button variant="contained" color="primary">
            Edit Profile
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Profile;
