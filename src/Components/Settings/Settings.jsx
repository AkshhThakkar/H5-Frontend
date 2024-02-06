import React from "react";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notificationsEnabled: true,
      language: "English",
      theme: "Light",
    };
  }

  handleNotificationsToggle = () => {
    this.setState((prevState) => ({
      notificationsEnabled: !prevState.notificationsEnabled,
    }));
  };

  handleLanguageChange = (event) => {
    this.setState({ language: event.target.value });
  };

  handleThemeChange = (event) => {
    this.setState({ theme: event.target.value });
  };

  render() {
    return (
      <div>
        <h1>Settings</h1>
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

        <div>
          <h2>Theme</h2>
          <select value={this.state.theme} onChange={this.handleThemeChange}>
            <option value="Light">Light</option>
            <option value="Dark">Dark</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Settings;
