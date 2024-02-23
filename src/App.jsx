import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import ForgotPassword from "./Components/Login/Forgot/ForgotPassword";
import MaybeShowSidebar from "./Components/MaybeShowSidebar";
import MaybeShowHeader from "./Components/MaybeShowHeader";
import Registration from "./Components/Login/Registration";
import ResetPassword from "./Components/Login/Forgot/ResetPassword";

function App() {
  const user = {
    username: "john_doe",
    email: "john@example.com",
    gender: "male",
    mobile: "1234567890",
  };

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
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/reset" element={<ResetPassword />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile" element={<Profile user={user} />} />
          <Route path="/notifications" element={<Notifications />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
