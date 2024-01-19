import React from "react";
import { Link } from "react-router-dom";
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
      id: "reports",
      route: "/reports",
      title: "Reports",
      component: BsMenuButtonWideFill,
    },
    {
      id: "settings",
      route: "/settings",
      title: "Settings",
      component: BsFillGearFill,
    },
    {
      id: "inventory",
      route: "/inventory",
      title: "Inventory",
      component: BsListCheck,
    },
  ];
  const WrapperComp = ({ Component }) => <Component className="icon" />;
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
        {sidebarMenu.map((data) => (
          <li className="sidebar-list-item" key={data.id}>
            <Link to={data.route}>
              <WrapperComp Component={data.component} /> {data.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
