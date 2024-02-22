import React, { useState } from "react";
import "./Notifications.css"; // Import CSS file for styling

const Notifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationHistory, setNotificationHistory] = useState([]);

  const handleNotificationsToggle = () => {
    setNotificationsEnabled((prevEnabled) => !prevEnabled);
  };

  // Function to generate a random notification
  const generateNotification = () => {
    const newNotification = {
      message: "New notification received",
      timestamp: new Date().toLocaleString(),
    };
    setNotificationHistory((prevHistory) => [...prevHistory, newNotification]);
  };

  return (
    <div className="notifications-container">
      <div className="header">
        <h2>Notifications</h2>
        <label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleNotificationsToggle}
          />
          Enable notifications
        </label>
      </div>
      {notificationsEnabled && (
        <div>
          <button
            className="notification-button"
            onClick={generateNotification}>
            Generate Notification
          </button>
        </div>
      )}
      <div className="notification-history">
        <h3>Notification History</h3>
        <ul>
          {notificationHistory.map((notification, index) => (
            <li key={index} className="notification-item">
              <span className="timestamp">{notification.timestamp}</span>
              <span className="message">{notification.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
