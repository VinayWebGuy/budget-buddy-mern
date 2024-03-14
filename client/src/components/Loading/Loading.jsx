import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading-bars">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default Loading;
