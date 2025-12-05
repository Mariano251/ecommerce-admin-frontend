import React from "react";
import ShopNavbar from "./ShopNavbar";
import Hamburguer from "./Hamburger";
import "./navbar.scss";

const ResponsiveNavbar: React.FC = () => {
  return (
    <>
      <div className="navbar-desktop">
        <ShopNavbar />
      </div>

      <div className="navbar-mobile">
        <Hamburguer />
      </div>
    </>
  );
};

export default ResponsiveNavbar;
