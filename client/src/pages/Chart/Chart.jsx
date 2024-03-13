import React, { useState } from "react";
import "./Chart.scss";
import LChart from "../../components/LChart/LChart";
import { income } from "../../income";
import { expense } from "../../expense";
import BChart from "../../components/BChart/BChart";

const Chart = () => {
  const incomeData = income;
  const expenseData = expense;
  const [chartType, setChartType] = useState("Line Chart");
  return (
    <div className="chart box">
      <div className="chart-header">
        <h2 className="pageHeading">Chart</h2>
        <select
          name="chart_type"
          id="chart_type"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="Line Chart">Line Chart</option>
          <option value="Bar Chart">Bar Chart</option>
        </select>
      </div>

      {chartType == "Line Chart" && (
        <div className="all-charts line-charts">
          <div className="singleChart">
            <LChart chartData={incomeData} wd="100%" ht="100%" />
            <h3>Income Chart</h3>
          </div>
          <div className="singleChart">
            <LChart chartData={expenseData} wd="100%" ht="100%" />
            <h3>Expense Chart</h3>
          </div>
        </div>
      )}
      {chartType == "Bar Chart" && (
        <div className="all-charts bar-charts">
          <div className="singleChart">
            <BChart wd="100%" ht="100%" chartData={incomeData} />
            <h3>Income Chart</h3>
          </div>
          <div className="singleChart">
            <BChart wd="100%" ht="100%" chartData={expenseData} />
            <h3>Expense Chart</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
