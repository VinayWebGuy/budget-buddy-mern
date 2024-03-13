import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LChart = ({ chartData, wd, ht, color = "#555" }) => {
  return (
    <div className="lchart" style={{ width: wd, height: ht }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={300} height={100} data={chartData}>
          <Tooltip />
          <XAxis dataKey="id" stroke={color} />
          <YAxis stroke={color} />
          <Line type="bump" dataKey="amount" stroke={color} strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LChart;
