import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Categories from "./Components/Categories/Categories";
import Customers from "./Components/Customers/Customers";
import Sales from "./Components/Sales/Sales";
import Inventory from "./Components/Inventory/Inventory";
import Reports from "./Components/Reports/Reports";
import Profile from "./Components/Profile/Profile";
import Notifications from "./Components/Notifications/Notifications";
import Login from "./Components/Login/index";
import MaybeShowSidebar from "./Components/MaybeShowSidebar";
import MaybeShowHeader from "./Components/MaybeShowHeader";
import { Toggle } from "./Components/Theme/Toggle";
// import Router from "./Router/Router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Components/Login/Registration";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <BrowserRouter>
        <MaybeShowSidebar>
          {
            <Sidebar
              openSidebarToggle={openSidebarToggle}
              OpenSidebar={OpenSidebar}
            />
          }
        </MaybeShowSidebar>
        <MaybeShowHeader>
          <Header OpenSidebar={OpenSidebar} />
        </MaybeShowHeader>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
        {/* <Router /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
