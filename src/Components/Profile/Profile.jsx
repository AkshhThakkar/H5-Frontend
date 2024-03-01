import React, { useState } from "react";
import "./Profile.css";

function Profile() {
  // State to keep track of the active user
  const [activeUser, setActiveUser] = useState(null);

  // Function to handle click on a profile
  const handleProfileClick = (user) => {
    setActiveUser(user);
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Profiles</h1>
      </header>
      <div className="profiles">
        {/* Main User */}
        <div
          className={`profile main-profile ${
            activeUser === "main" ? "active" : ""
          }`}
          onClick={() => handleProfileClick("main")}>
          <div className="profile-info">
            <div className="user-info">
              <img
                src="https://avatarfiles.alphacoders.com/327/327326.jpg"
                alt="Profile"
                className="profile-image"
              />
              <div className="user-details">
                <h2 className="username">Aksh Thakkar</h2>
                <p className="email">Email: aksht455@gmail.com</p>
                <p className="location">Location: New York, United States</p>
              </div>
              {activeUser === "main" && <div className="active-dot"></div>}
            </div>
          </div>
        </div>

        {/* Other Users arranged in 2x2 format */}
        <div className="profile-grid">
          {/* User 1 */}
          <div
            className={`profile ${
              activeUser === "Yash Chauhan" ? "active" : ""
            }`}
            onClick={() => handleProfileClick("Yash Chauhan")}>
            <div className="profile-info">
              <div className="user-info">
                <img
                  src="https://qph.cf2.quoracdn.net/main-qimg-ca33c4578b1b17d349203ff24ec94b3f-lq"
                  alt="Profile"
                  className="profile-image"
                />
                <div className="user-details">
                  <h2 className="username">Yash Chauhan</h2>
                  <p className="email">Email: yashp440789@gmail.com </p>
                  <p className="location">Location: Funchal, Portugal</p>
                </div>
                {activeUser === "Yash Chauhan" && (
                  <div className="active-dot"></div>
                )}
              </div>
            </div>
          </div>
          {/* User 2 */}
          {/* Include similar code for other users */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
