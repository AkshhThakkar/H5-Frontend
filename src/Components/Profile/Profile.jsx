// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { selectUser, selectUserId } from "../../Redux/UsersSlice";

// import {
//   Typography,
//   Button,
//   TextField,
//   Container,
//   Grid,
//   Avatar,
//   Card,
//   CardContent,
// } from "@mui/material";
// import "./Profile.css";

// const Profile = () => {
//   const user = useSelector(selectUser);
//   const userId = useSelector(selectUserId); // Fetch userId (_id) from Redux store
//   const dispatch = useDispatch();
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedUser, setEditedUser] = useState(user);
//   const [profilePhotoFile, setProfilePhotoFile] = useState(null);

//   const handleEdit = () => {
//     setIsEditing(true);
//     setEditedUser(user);
//   };

//   const handleSave = async () => {
//     setIsEditing(false);

//     try {
//       const formData = new FormData();
//       formData.append("userId", userId);
//       formData.append("username", editedUser.username);
//       formData.append("email", editedUser.email);
//       formData.append("mobile", editedUser.mobile);
//       formData.append("gender", editedUser.gender);
//       if (profilePhotoFile) {
//         formData.append("image", profilePhotoFile); // Append the File object directly
//       }

//       console.log("Data being sent to the backend:", formData);

//       const response = await fetch(
//         "http://192.168.3.236:3000/api/users/profile",
//         {
//           method: "PUT",
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update user.");
//       }

//       const updatedUserData = await response.json();
//       dispatch(updateUser(updatedUserData));
//     } catch (error) {
//       console.error("Error updating user:", error.message);
//     }
//   };

//   const handleChange = (e) => {
//     setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
//   };

//   const handleProfilePhotoChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePhotoFile(file);
//     setEditedUser({ ...editedUser, profilePhoto: URL.createObjectURL(file) });
//   };

//   return (
//     <Container maxWidth="md" style={{ marginTop: "2rem" }}>
//       <Typography variant="h4" gutterBottom className="profile-heading">
//         Profile
//       </Typography>
//       <Card elevation={3} className="profile-card">
//         <CardContent>
//           <Grid container spacing={2} alignItems="center">
//             <Grid item>
//               <Avatar
//                 alt="Profile"
//                 src={`data:image/png;base64,${editedUser.image}`}
//                 sx={{ width: 100, height: 100 }}
//                 className="avatar"
//               />
//             </Grid>
//             <Grid item xs={12} md container direction="column">
//               <Grid item xs>
//                 <Typography variant="h5" className="username">
//                   {editedUser.username}
//                 </Typography>
//                 <Typography variant="body1" className="info">
//                   Email: {editedUser.email}
//                 </Typography>
//                 <Typography variant="body1" className="info">
//                   Mobile: {editedUser.mobile}
//                 </Typography>
//                 <Typography variant="body1" className="info">
//                   Gender: {editedUser.gender}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Grid>
//           {isEditing && (
//             <Grid
//               container
//               spacing={2}
//               justifyContent="center"
//               style={{ marginTop: "2rem" }}>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   name="username"
//                   label="Username"
//                   value={editedUser.username}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   name="email"
//                   label="Email"
//                   value={editedUser.email}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   name="mobile"
//                   label="Mobile"
//                   value={editedUser.mobile}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} md={6}>
//                 <TextField
//                   fullWidth
//                   name="gender"
//                   label="Gender"
//                   value={editedUser.gender}
//                   onChange={handleChange}
//                 />
//               </Grid>
//             </Grid>
//           )}
//           <Grid item>
//             {!isEditing ? (
//               <Button
//                 variant="contained"
//                 onClick={handleEdit}
//                 className="edit-button">
//                 Edit
//               </Button>
//             ) : (
//               <div>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleProfilePhotoChange}
//                 />
//                 <Button
//                   variant="contained"
//                   onClick={handleSave}
//                   className="save-button">
//                   Save
//                 </Button>
//               </div>
//             )}
//           </Grid>
//         </CardContent>
//       </Card>
//     </Container>
//   );
// };

// export default Profile;
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectUserId } from "../../Redux/UsersSlice";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { updateUser } from "../../Redux/UsersSlice";
import { Snackbar } from "@mui/material";

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
  const userId = useSelector(selectUserId); // Fetch userId (_id) from Redux store
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = async () => {
    setIsEditing(false);

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("username", editedUser.username);
      formData.append("email", editedUser.email);
      formData.append("mobile", editedUser.mobile);
      formData.append("gender", editedUser.gender);
      if (profilePhotoFile) {
        formData.append("image", profilePhotoFile); // Append the File object directly
      }

      console.log("Data being sent to the backend:", formData);

      const response = await fetch(
        "http://192.168.3.236:3000/api/users/profile",
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      const updatedUserData = await response.json();
      dispatch(updateUser(updatedUserData));

      // Display Snackbar after saving profile
      setSnackbarOpen(true);

      // Redirect to login page ("/") after saving the profile
      navigate("/");
    } catch (error) {
      console.error("Error updating user:", error.message);
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhotoFile(file);
    setEditedUser({ ...editedUser, profilePhoto: URL.createObjectURL(file) });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
                src={`data:image/png;base64,${editedUser.image}`}
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
          <Grid item>
            {!isEditing ? (
              <Button
                variant="contained"
                onClick={handleEdit}
                className="edit-button">
                Edit
              </Button>
            ) : (
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                />
                <Button
                  variant="contained"
                  onClick={handleSave}
                  className="save-button">
                  Save
                </Button>
              </div>
            )}
          </Grid>
        </CardContent>
      </Card>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000} // Adjust the duration as needed
        onClose={handleSnackbarClose}
        message="Please Login again!"
      />
    </Container>
  );
};

export default Profile;
