import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from React Router
import "./Notifications.css"; // Import CSS file for styling

const Notifications = () => {
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://192.168.182.191:3000/api/not/notification"
      );

      // Extracting the special message
      const specialMessage = response.data.message;

      // Combining special message with the rest of the notifications
      const restOfNotifications = response.data.result;

      setNotificationHistory([
        { message: specialMessage },
        ...restOfNotifications,
      ]);
      setLoading(false);
      console.log(response);
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

  const handleViewNotification = (index) => {
    // Navigate to "reports" route
    navigate("/reports");
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
        <button className="clear-button" onClick={handleClearNotifications}>
          Clear Notifications
        </button>
      </div>
      <div className="notification-history">
        <h3>Notification History</h3>
        <ul>
          {notificationHistory.map((notification, index) => (
            <li key={index} className="notification-item">
              <div className="notification-content">
                {notification.message ? (
                  <div>
                    <span
                      className="special-message"
                      style={{ fontWeight: "bold", fontSize: "25px" }}>
                      {notification.message}
                    </span>
                    <button
                      className="view-button"
                      onClick={() => handleViewNotification(index)} // Call handleViewNotification
                    >
                      View
                    </button>
                  </div>
                ) : (
                  <>
                    <span className="product-name">
                      {notification.productName}
                    </span>
                    <br />
                    <span className="inventory">
                      Remaining Inventory:{" "}
                      <span
                        style={{
                          color:
                            notification.inventory <= 5 ? "red" : "inherit",
                        }}>
                        {notification.inventory}
                      </span>
                      <br />
                      {notification.inventory >= 1 &&
                        notification.inventory <= 5 && (
                          <span className="restock-message">
                            Restock this product!
                          </span>
                        )}
                      {notification.nventory === 0 && (
                        <span className="restock-message">
                          Item out of Stock, restock this item immediately!
                        </span>
                      )}
                    </span>
                  </>
                )}
              </div>
              <div className="button-container">
                <button
                  className="dismiss-button"
                  onClick={() => handleDismissNotification(index)}>
                  Dismiss
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;
