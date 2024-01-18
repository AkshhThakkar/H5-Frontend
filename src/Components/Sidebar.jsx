import React from "react";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsCart3 className="icon_header" /> Admin Panel
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        <li className="sidebar-list-item">
          <link to="">
            <BsGrid1X2Fill className="icon" /> Dashboard
          </link>
        </li>
        <li className="sidebar-list-item">
          <link to="">
            <BsFillArchiveFill className="icon" /> Products
          </link>
        </li>
        <li className="sidebar-list-item">
          <link to="">
            <BsFillGrid3X3GapFill className="icon" /> Categories
          </link>
        </li>
        <li className="sidebar-list-item">
          <link to="">
            <BsPeopleFill className="icon" /> Customers
          </link>
        </li>
        <li className="sidebar-list-item">
          <link to="">
            <BsListCheck className="icon" /> Inventory
          </link>
        </li>
        <li className="sidebar-list-item">
          <link to="">
            <BsMenuButtonWideFill className="icon" /> Reports
          </link>
        </li>
        <li className="sidebar-list-item">
          <link to="">
            <BsFillGearFill className="icon" /> Setting
          </link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
