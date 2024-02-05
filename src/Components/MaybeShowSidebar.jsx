import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowSidebar = ({ children }) => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/register" ||
      location.pathname === "/forgotpassword"
    ) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [location]);
  return <>{showSidebar && children}</>;
};
export default MaybeShowSidebar;
