import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Dashboard from "./Components/Dashboard/Dashboard";
import Sales from "./Components/Sales/Sales";
import Suppliers from "./Components/Supply/Suppliers";
import Reports from "./Components/Reports/Reports";
import Inventory from "./Components/Inventory/Inventory";
import Bills from "./Components/Bills/Bills";
import Profile from "./Components/Profile/Profile";
import Notifications from "./Components/Notifications/Notifications";
import SignIn from "./Components/Login/SignIn";
import ForgotPassword from "./Components/Login/ForgotPassword";
import MaybeShowSidebar from "./Sidebar/MaybeShowSidebar";
import MaybeShowHeader from "./Header/MaybeShowHeader";
import SignUp from "./Components/Login/SignUp";
import ResetPassword from "./Components/Login/ResetPassword";
import NotFound from "./Components/NotFound/index";

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="grid-container">
      <BrowserRouter>
        <Header setSearchQuery={setSearchQuery} />
        <MaybeShowSidebar>
          <Sidebar
            openSidebarToggle={openSidebarToggle}
            OpenSidebar={OpenSidebar}
          />
        </MaybeShowSidebar>
        <MaybeShowHeader>
          <Header OpenSidebar={OpenSidebar} />
        </MaybeShowHeader>
        <Routes>
          <Route exact path="/" element={<SignIn />} />
          <Route exact path="/register" element={<SignUp />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/reset" element={<ResetPassword />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route path="/supply" element={<Suppliers />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/Bills" element={<Bills />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/notifications" element={<Notifications />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
