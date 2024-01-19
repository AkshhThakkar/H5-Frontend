import { useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Home from "./Components/Homepage";
import HomePage from "./Components/Homepage";
import Dashboard from "./Components/Frontend Layouts/Dashboard";
import Categories from "./Components/Frontend Layouts/Categories";
import Customers from "./Components/Frontend Layouts/Customers";
import Inventory from "./Components/Frontend Layouts/Inventory";
import Products from "./Components/Frontend Layouts/Products";
import Reports from "./Components/Frontend Layouts/Reports";
import Settings from "./Components/Frontend Layouts/Settings";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container">
      <Header OpenSidebasr={OpenSidebar} />
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/dashboard" element={<HomePage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/products" element={<Products />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
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
