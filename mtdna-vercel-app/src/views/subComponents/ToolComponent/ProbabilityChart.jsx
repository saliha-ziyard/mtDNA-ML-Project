import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Custom colors for each pie slice
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

// Custom label renderer to show name and percentage
const renderCustomLabel = ({ name, value }) => {
  return `${name}: ${value.toFixed(2)}%`;
};

const ProbabilityChart = ({ probabilities, chartRef }) => {
  const preparePieChartData = () => {
    if (!probabilities) return [];

    return Object.entries(probabilities).map(([name, value]) => ({
      name,
      value: parseFloat((value * 100).toFixed(2)), // Convert to percentage
    }));
  };

  const pieData = preparePieChartData();

  // Responsive radius depending on device width
  const outerRadius = window.innerWidth < 480 ? 70 : 100;

  return (
    <div className="probability-chart">
      <h3>Probability Distribution</h3>
      <div
        style={{
          width: '100%',
          height: window.innerWidth < 480 ? 260 : 300,
        }}
        ref={chartRef}
      >
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={outerRadius}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${parseFloat(value).toFixed(2)}%`} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="probability-text">
        <h4>Detailed Probabilities:</h4>
        {pieData.map(({ name, value }) => (
          <p key={name}>{name}: {value.toFixed(2)}%</p>
        ))}
      </div>
    </div>
  );
};

export default ProbabilityChart;
