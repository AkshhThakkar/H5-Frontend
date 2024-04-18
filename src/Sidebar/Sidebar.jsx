import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsSteam,
  BsListCheck,
  BsReceipt,
  BsPersonCircle,
} from "react-icons/bs";
import { RiCloseFill } from "react-icons/ri"; // Importing RiCloseFill icon from react-icons/ri

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const sidebarMenu = [
    {
      id: "dashboard",
      route: "/dashboard",
      title: "Dashboard",
      component: BsGrid1X2Fill,
    },
    {
      id: "inventory",
      route: "/inventory",
      title: "Inventory",
      component: BsCart3,
    },
    {
      id: "sales",
      route: "/sales",
      title: "Sales",
      component: BsListCheck,
    },
    {
      id: "bills",
      route: "/bills",
      title: "Bills",
      component: BsReceipt,
    },
    {
      id: "profile",
      route: "/profile",
      title: "Profile",
      component: BsPersonCircle,
    },
  ];

  const WrapperComp = ({ Component }) => <Component className="icon" />;

  return (
    <aside
      id="sidebar"
      className={openSidebarToggle ? "sidebar-responsive" : ""}
      style={{ backgroundColor: "#171717", color: "#ffffff" }}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsSteam className="icon_header" size={40} /> Infamax
        </div>
        {/* Conditionally render the close button if sidebar is open */}
        {openSidebarToggle && (
          <button className="close-button" onClick={OpenSidebar}>
            <RiCloseFill />
          </button>
        )}
      </div>

      <ul className="sidebar-list">
        {sidebarMenu.map((data) => (
          <Link
            to={data.route}
            style={{
              textDecoration: "none",
              color: "#9e9ea4",
            }}
            key={data.id}>
            <li
              className="sidebar-list-item"
              style={{ transition: "background-color 0.3s ease" }}>
              <WrapperComp Component={data.component} /> {data.title}
            </li>
          </Link>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
