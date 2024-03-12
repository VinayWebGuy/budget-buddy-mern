import React from "react";
import "./Dashboard.scss";
import { dashboardBlocks } from "./../../data";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="boxes">
        {dashboardBlocks.map((block) => (
          <div className="box" key={block.id}>
            <div className="counter">{block.counter}</div>
            <div className="title">{block.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
