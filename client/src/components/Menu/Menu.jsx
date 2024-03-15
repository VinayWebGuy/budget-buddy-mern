import React from "react";
import "./Menu.scss";
import { Link, useLocation } from "react-router-dom";
import { currentVersion, menuItems } from "./../../data";

const Menu = () => {
  const location = useLocation();
  return (
    <div className="menu">
      {menuItems.map((item) => (
        <Link
          title={item.title}
          to={item.url}
          className={`listItem ${
            location.pathname === item.url ? "active" : ""
          }`}
          key={item.id}
        >
          <img src={item.icon} alt="" />
          <div className="title">{item.title}</div>
        </Link>
      ))}
      <span className="listItem version">
        <img src="/version.svg" alt="" />
        <span>version {currentVersion}</span>
      </span>
    </div>
  );
};

export default Menu;
