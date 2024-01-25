import React from "react";
import { BrowserRouter, useNavigate, Navigate } from "react-router-dom";
import {
  BsFillBellFill,
  BsFillEnvelopeFill,
  BsPersonCircle,
  BsSearch,
  BsJustify,
} from "react-icons/bs";
import Login from "./Login/index";

function Header({ OpenSidebar }) {
  // const navigate = useNavigate();
  // const handleClick = () => navigate("/login");
  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right">
        {/* <BrowserRouter> */}
        {/* <useNavigate> */}
        <button onClick={() => handleClick()}>Login</button>
        {/* </useNavigate>
        </BrowserRouter> */}
        <BsFillBellFill className="icon" />
        <BsFillEnvelopeFill className="icon" />
        <BsPersonCircle className="icon" />
      </div>
    </header>
  );
}
export default Header;
