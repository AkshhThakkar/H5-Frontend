import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import HomePage from "./Components/Homepage";
import Dashboard from "./Components/Dashboard/Dashboard";
import Categories from "./Components/Categories/Categories";
import Customers from "./Components/Customers/Customers";
import Inventory from "./Components/Inventory/Inventory";
import Products from "./Components/Products/Products";
import Reports from "./Components/Reports/Reports";
import Settings from "./Components/Settings/Settings";
import Login from "./Components/Login/index";
// import Router from "./Router/Router";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <BrowserRouter>
        <Header OpenSidebasr={OpenSidebar} />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
        {/* <Router /> */}
        {
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
