import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsFillBellFill, BsJustify } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri"; // Importing animated search icon
import "./Header.css"; // Importing the CSS file for styling

function Header({ OpenSidebar }) {
  const navigate = useNavigate();
  const notificationNavigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleNotification = () => notificationNavigate("/notifications");
  const handleClick = () => navigate("/");

  return (
    <header className="header">
      <div className="menu-icon" onClick={OpenSidebar}>
        <BsJustify className="icon" />
      </div>
      <div className="search">
        <div className="search-box-container">
          <RiSearchLine className="search-icon" />
          <input
            className="search-box"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="header-right">
        <button
          className="logout-btn animated-btn"
          onClick={() => handleClick()}>
          Logout
        </button>
        <BsFillBellFill
          className="icon bell-icon"
          onClick={() => handleNotification()}
        />
      </div>
    </header>
  );
}

export default Header;
