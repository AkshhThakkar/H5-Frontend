import React from "react";

class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsEnabled: true,
    };
  }

  handleNotificationsToggle = () => {
    this.setState((prevState) => ({
      notificationsEnabled: !prevState.notificationsEnabled,
    }));
  };

  render() {
    return (
      <div>
        <div>
          <h2>Notifications</h2>
          <label>
            <input
              type="checkbox"
              checked={this.state.notificationsEnabled}
              onChange={this.handleNotificationsToggle}
            />
            Enable notifications
          </label>
        </div>
      </div>
    );
  }
}

export default Notifications;
