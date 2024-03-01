import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsPeopleFill,
  BsListCheck,
  BsReceipt,
  BsSteam,
  BsPersonCircle,
} from "react-icons/bs";

function Sidebar({ openSidebarToggle, OpenSidebar }) {
  const sidebarMenu = [
    {
      id: "dashboard",
      route: "/dashboard",
      title: "Dashboard",
      component: BsGrid1X2Fill,
    },
    {
      id: "customers",
      route: "/customers",
      title: "Customers",
      component: BsPeopleFill,
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
      id: "reports",
      route: "/reports",
      title: "Reports",
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
      style={{ backgroundColor: "#202020", color: "#ffffff" }}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          <BsSteam className="icon_header" size={40} /> Admin Panel
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
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
