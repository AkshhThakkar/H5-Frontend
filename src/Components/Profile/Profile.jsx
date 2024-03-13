// Profile.js

import React from "react";
import { useSelector } from "react-redux";
import { selectuser } from "../../Redux/UsersSlice";

const Profile = () => {
  // Retrieve user data from Redux store
  const user = useSelector(selectuser);

  return (
    <div>
      <h1>Profile</h1>
      {user && (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          {/* Render other user information */}
        </div>
      )}
    </div>
  );
};

export default Profile;
