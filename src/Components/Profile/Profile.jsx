import React from "react";
import "./Profile.css";

function Profile() {
  return (
    <div className="profile-container">
      <header className="profile-header">
        <h1>Profiles</h1>
      </header>
      <div className="profiles">
        {/* Main User */}
        <div className="profile main-profile">
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
            </div>
          </div>
        </div>

        {/* Other Users arranged in 2x2 format */}
        <div className="profile-grid">
          {/* User 1 */}
          <div className="profile">
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
              </div>
            </div>
          </div>
          {/* User 2 */}
          <div className="profile">
            <div className="profile-info">
              <div className="user-info">
                <img
                  src="https://i.pinimg.com/564x/74/89/0d/74890d91e11373025d0d437490511acc.jpg"
                  alt="Profile"
                  className="profile-image"
                />
                <div className="user-details">
                  <h2 className="username">Vedant Bhatt</h2>
                  <p className="email">Email: vedantb658@gmail.com</p>
                  <p className="location">Location: Tokyo, Japan</p>
                </div>
              </div>
            </div>
          </div>
          {/* User 3 */}
          <div className="profile">
            <div className="profile-info">
              <div className="user-info">
                <img
                  src="http://m.gettywallpapers.com/wp-content/uploads/2023/11/Cool-Iron-Man-pfp.jpg"
                  alt="Profile"
                  className="profile-image"
                />
                <div className="user-details">
                  <h2 className="username">Smit Chauhan</h2>
                  <p className="email">Email: smitsinhchauhan89@gmail.com</p>
                  <p className="location">Location: Toronto, Canada</p>
                </div>
              </div>
            </div>
          </div>
          {/* User 4 */}
          <div className="profile">
            <div className="profile-info">
              <div className="user-info">
                <img
                  src="https://avatarfiles.alphacoders.com/246/246608.jpg"
                  alt="Profile"
                  className="profile-image"
                />
                <div className="user-details">
                  <h2 className="username">Krish Chaudhari</h2>
                  <p className="email">Email: krishchaudhari76@gmail.com</p>
                  <p className="location">Location: Pattaya, Thailand</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
