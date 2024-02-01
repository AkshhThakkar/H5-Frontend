import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowSidebar = ({ children }) => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/register") {
      setShowSidebar(false);
      console.log("setShowSidebar if");
    } else {
      setShowSidebar(true);
      console.log("setShowSidebar else");
    }
  }, [location]);
  return <>{showSidebar && children}</>;
};
export default MaybeShowSidebar;
