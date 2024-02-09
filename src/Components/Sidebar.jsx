import React from "react";
import { Link } from "react-router-dom";
import {
  BsCart3,
  BsGrid1X2Fill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
  BsAlexa,
  BsAlipay,
  BsPersonExclamation,
  BsPersonFillLock,
  BsDatabaseFillGear,
  BsCake2Fill,
  BsActivity,
  BsSave,
  BsQuora,
  BsWhatsapp,
  BsPower,
  BsTwitterX,
  BsBootstrapFill,
  BsEmojiKiss,
  BsEmojiGrin,
  BsFillEmojiSunglassesFill,
  BsPersonBadge,
  BsPersonPlus,
  BsFillFileEarmarkPersonFill,
  BsValentine,
  BsVirus,
  BsHr,
  BsAppIndicator,
  BsFileZip,
  BsMenuApp,
  BsApple,
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
      component: BsMenuButtonWideFill,
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
      className={openSidebarToggle ? "sidebar-responsive" : ""}>
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
