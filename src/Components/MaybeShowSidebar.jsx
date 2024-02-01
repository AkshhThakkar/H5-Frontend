import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowSidebar = ({ children }) => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    console.log("this is location", location);
    if (location.pathname === "/login" && location.pathname === "/register") {
      setShowSidebar(true);
    } else {
      setShowSidebar(false);
    }
  }, [location]);
  console.log("showSidebar", showSidebar);
  return <>{showSidebar && children}</>;
};
export default MaybeShowSidebar;
