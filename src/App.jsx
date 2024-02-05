import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Categories from "./Components/Categories/Categories";
import Customers from "./Components/Customers/Customers";
import Inventory from "./Components/Inventory/Inventory";
import Products from "./Components/Products/Products";
import Reports from "./Components/Reports/Reports";
import Settings from "./Components/Settings/Settings";
import Login from "./Components/Login/index";
import MaybeShowSidebar from "./Components/MaybeShowSidebar";
import MaybeShowHeader from "./Components/MaybeShowHeader";
// import Router from "./Router/Router";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Registration from "./Components/Login/Registration";
import { ForgotPassword } from "./Components/Login/ForgotPassword";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  const [view, setView] = useState("basic");
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
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        {/* <Router /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
