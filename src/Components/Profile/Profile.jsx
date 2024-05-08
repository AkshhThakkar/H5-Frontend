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
//         "http://192.168.1.13:3000/api/users/profile",
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
import { selectUser, selectUserId } from "../../redux/UsersSlice";
import { updateUser } from "../../redux/UsersSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Typography,
  Button,
  TextField,
  Container,
  Grid,
  Avatar,
  Card,
  CardContent,
  MenuItem,
} from "@mui/material";
import "./Profile.css";

const Profile = () => {
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);
  const [profilePhotoFile, setProfilePhotoFile] = useState(null);
  const [profilePhotoPreview, setProfilePhotoPreview] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUser(user);
  };

  const handleSave = async () => {
    setIsEditing(false);

    try {
      if (!editedUser) {
        throw new Error("User data is not available.");
      }

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("username", editedUser.username);
      formData.append("email", editedUser.email);
      formData.append("mobile", editedUser.mobile);
      formData.append("gender", editedUser.gender);

      if (profilePhotoFile) {
        const base64Image = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => {
            resolve(reader.result.split(",")[1]);
          };
          reader.onerror = reject;
          reader.readAsDataURL(profilePhotoFile);
        });

        formData.append("image", base64Image);
      }

      console.log("Data being sent to the backend:", formData);

      const response = await fetch("http://localhost:3000/api/user/profile", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      const updatedUserData = await response.json();
      dispatch(updateUser(updatedUserData));

      // Show success toast
      toast.success(
        "Profile updated successfully! Redirecting to Login page..."
      );

      // Redirect to "/" after 1 second
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error updating user:", error.message);
      // Show error toast
      toast.error("Failed to update profile.");
    }
  };

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhotoFile(file);
    setProfilePhotoPreview(URL.createObjectURL(file));
    setEditedUser({ ...editedUser, profilePhoto: URL.createObjectURL(file) });
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
              <div className="profile-photo-container">
                {isEditing ? (
                  <>
                    <label htmlFor="profile-photo-input">
                      <Avatar
                        alt="Profile"
                        src={
                          profilePhotoPreview ||
                          `data:image/png;base64,${editedUser?.image || ""}`
                        }
                        sx={{ width: 100, height: 100, cursor: "pointer" }}
                        className="avatar"
                      />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePhotoChange}
                      style={{ display: "none" }}
                      id="profile-photo-input"
                    />
                  </>
                ) : (
                  <Avatar
                    alt="Profile"
                    src={
                      profilePhotoPreview ||
                      (editedUser && editedUser.image
                        ? `data:image/png;base64,${editedUser.image}`
                        : "")
                    }
                    sx={{ width: 100, height: 100, cursor: "pointer" }}
                    className="avatar"
                    onClick={() =>
                      isEditing &&
                      document.getElementById("profile-photo-input").click()
                    }
                  />
                )}

                {isEditing && (
                  <label htmlFor="profile-photo-input" className="edit-icon">
                    <span role="img" aria-label="pencil">
                      ✎
                    </span>
                  </label>
                )}
              </div>
            </Grid>

            <Grid item xs={12} md container direction="column">
              <Grid item xs>
                <Typography variant="h5" className="username">
                  {editedUser && editedUser.username}
                </Typography>
                <Typography variant="body1" className="info">
                  Email: {editedUser && editedUser.email}
                </Typography>
                <Typography variant="body1" className="info">
                  Mobile: {editedUser && editedUser.mobile}
                </Typography>
                <Typography variant="body1" className="info">
                  Gender: {editedUser && editedUser.gender}
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
                  value={editedUser.username || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  value={editedUser.email || ""}
                  InputProps={{ readOnly: true }}
                  variant="outlined"
                  disabled
                />
              </Grid>
              <Grid item xs={12} md={6} style={{ marginTop: "1rem" }}>
                <TextField
                  fullWidth
                  name="mobile"
                  label="Mobile"
                  value={editedUser.mobile || ""}
                  onChange={handleChange}
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={6}
                style={{ marginTop: "1rem", textAlign: "center" }}>
                <TextField
                  select
                  fullWidth
                  label="Gender"
                  value={editedUser.gender || ""}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "gender", value: e.target.value },
                    })
                  }
                  variant="outlined"
                  style={{ minWidth: 120, textAlign: "left" }}>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          )}

          <Grid container justifyContent="center" style={{ marginTop: "1rem" }}>
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
                  className="save-button"
                  style={{ marginLeft: "1rem" }}>
                  Save
                </Button>
              )}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <ToastContainer /> {/* Place the ToastContainer at the top level */}
    </Container>
  );
};

export default Profile;
