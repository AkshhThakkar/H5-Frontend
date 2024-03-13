import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Notifications.css"; // Import CSS file for styling

const Notifications = () => {
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://192.168.3.236:3000/api/not/notification"
      );
      setNotificationHistory(response.data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setError("Error fetching notifications. Please try again later.");
      setLoading(false);
    }
  };

  const handleDismissNotification = (index) => {
    const updatedNotifications = [...notificationHistory];
    updatedNotifications.splice(index, 1);
    setNotificationHistory(updatedNotifications);
  };

  const handleClearNotifications = () => {
    setNotificationHistory([]);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="notifications-container">
      <div className="header">
        <h2>Notifications</h2>
      </div>
      <div className="notification-history">
        <h3>Notification History</h3>
        <ul>
          {notificationHistory.map((notification, index) => (
            <li key={index} className="notification-item">
              <div>
                <span className="product-name">{notification.productName}</span>
                <br />
                <span className="inventory">
                  Remaining Inventory:{" "}
                  <span
                    style={{
                      color:
                        notification.remainingInventory <= 5
                          ? "red"
                          : "inherit",
                    }}>
                    {notification.remainingInventory}
                  </span>
                  <br />
                  {notification.remainingInventory >= 1 &&
                    notification.remainingInventory <= 5 && (
                      <span className="restock-message">
                        Restock this product!
                      </span>
                    )}
                  {notification.remainingInventory === 0 && (
                    <span className="restock-message">
                      Item out of Stock, restock this item immediately!
                    </span>
                  )}
                </span>
              </div>
              <button
                className="dismiss-button"
                onClick={() => handleDismissNotification(index)}>
                Dismiss
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="clear-notifications">
        <button className="clear-button" onClick={handleClearNotifications}>
          Clear Notifications
        </button>
      </div>
    </div>
  );
};

export default Notifications;
