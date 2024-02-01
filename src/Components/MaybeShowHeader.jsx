import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const MaybeShowHeader = ({ children }) => {
  const location = useLocation();
  const [showHeader, setShowHeader] = useState(false);
  useEffect(() => {
    if (location.pathname === "/" || location.pathname === "/register") {
      setShowHeader(false);
    } else {
      setShowHeader(true);
    }
  }, [location]);
  return <>{showHeader && children}</>;
};
export default MaybeShowHeader;
