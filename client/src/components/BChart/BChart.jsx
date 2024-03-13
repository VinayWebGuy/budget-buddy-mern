import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BChart = ({ wd, ht, chartData, color = "#555" }) => {
  return (
    <div className="lchart" style={{ width: wd, height: ht }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart width={150} height={40} data={chartData}>
          <Tooltip />
          <XAxis dataKey="id" stroke={color} />
          <YAxis stroke={color} />
          <Bar dataKey="amount" fill={color} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BChart;
