import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DefaultHeader from "./DefaultHeader";

const Header = () => {
  const [path, setPath] = useState(window.location.pathname);
  const location = useLocation();

  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  switch (path) {
    case "/login":
      return null;
    default:
      return <DefaultHeader />;
  }
};
export default Header;
