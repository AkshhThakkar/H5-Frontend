// Profile.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../Redux/UsersSlice";
import {
  Typography,
  Button,
  TextField,
  Container,
  Grid,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";
import "./Profile.css";

const Profile = () => {
  const user = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = () => {
    // Implement logic to save editedUser
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "2rem" }}>
      <Typography variant="h4" gutterBottom className="profile-heading">
        Profile
      </Typography>
      <Card elevation={3} className="profile-card">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                alt="Profile"
                src={editedUser.profilePhoto || "/default-profile-photo.png"}
                sx={{ width: 100, height: 100 }}
                className="avatar"
              />
            </Grid>
            <Grid item xs={12} md container direction="column">
              <Grid item xs>
                <Typography variant="h5" className="username">
                  {editedUser.username}
                </Typography>
                <Typography variant="body1" className="info">
                  Email: {editedUser.email}
                </Typography>
                <Typography variant="body1" className="info">
                  Mobile: {editedUser.mobile}
                </Typography>
                <Typography variant="body1" className="info">
                  Gender: {editedUser.gender}
                </Typography>
              </Grid>
              <Grid item>
                {!isEditing ? (
                  <Button
                    variant="contained"
                    onClick={handleEdit}
                    className="edit-button">
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    className="save-button">
                    Save
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
          {isEditing && (
            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ marginTop: "2rem" }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="username"
                  label="Username"
                  value={editedUser.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  value={editedUser.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="mobile"
                  label="Mobile"
                  value={editedUser.mobile}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="gender"
                  label="Gender"
                  value={editedUser.gender}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default Profile;
