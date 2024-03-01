import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillBellFill, BsSearch, BsJustify } from "react-icons/bs";

function Header({ OpenSidebar }) {
  const navigate = useNavigate();
  const notificationnavigate = useNavigate();
  const handleNotification = () => notificationnavigate("/notifications");
  const handleClick = () => navigate("/");
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="search">
        <BsSearch className="icon" />
        <input
          className="search-box"
          type="text"
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="header-right">
        <button onClick={() => handleClick()}>Logout</button>
        <BsFillBellFill className="icon" onClick={() => handleNotification()} />
      </div>
    </header>
  );
}
export default Header;
