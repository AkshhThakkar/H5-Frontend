import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Components/Login";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";

function Header({ OpenSidebar }) {
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>;
  const navigate = useNavigate();
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
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}
export default Header;
