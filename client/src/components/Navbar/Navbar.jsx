import React, { useEffect, useRef, useState } from "react";

import { IoNotificationsSharp } from "react-icons/io5";
import "./Navbar.scss";

const Navbar = (props) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="navbar">
      <div className="logo">Budget Buddy</div>
      <img
        className="menu-icon"
        onClick={props.handleToggle}
        src="/menu.svg"
        alt=""
      />
      <div className="icons">
        <span ref={notificationsRef}>
          <img
            onClick={() => setShowNotifications(!showNotifications)}
            src="/notifications.svg"
            alt=""
          />
          {showNotifications && (
            <div className="notification-popup">
              <p>All Notifications</p>
              <div className="notifications-list">
                <p>
                  <IoNotificationsSharp />{" "}
                  <span>Income Added Successfully.</span>
                </p>
                <p>
                  <IoNotificationsSharp />{" "}
                  <span>Expense Added Successfully.</span>
                </p>
                <p>
                  <IoNotificationsSharp />{" "}
                  <span>Expense Added Successfully.</span>
                </p>
                <p>
                  <IoNotificationsSharp /> <span>You consumed 50% budget.</span>
                </p>
              </div>
              <div className="buttons center">
                <button className="btn sm">View All</button>
              </div>
            </div>
          )}
        </span>
        <span className="user-icon">
          <img src="/profile.svg" alt="" />
          <span>Vinay Munjal</span>
        </span>
      </div>
    </div>
  );
};

export default Navbar;
