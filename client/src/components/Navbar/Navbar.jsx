import React from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Budget Buddy</div>
      <div className="icons">
        <Link to="">
          <img src="/settings.svg" alt="" />
        </Link>
        <Link to="">
          <img src="/notifications.svg" alt="" />
        </Link>
        <Link to="" className="user-icon">
          <img src="/profile.svg" alt="" />
          <span>Vinay Munjal</span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
