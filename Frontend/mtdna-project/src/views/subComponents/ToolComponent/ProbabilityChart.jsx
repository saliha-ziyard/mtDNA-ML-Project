import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ProbabilityChart = ({ probabilities, chartRef }) => {
  // Prepare data for pie chart
  const preparePieChartData = () => {
    if (!probabilities) return [];

    return Object.entries(probabilities).map(([name, value]) => ({
      name,
      value: parseFloat((value * 100).toFixed(2)), // Convert to percentage with 2 decimals
    }));
  };

  const pieData = preparePieChartData();

  return (
    <div className="probability-chart">
      <h3>Probability Distribution</h3>
      <div style={{ width: '100%', height: 300 }} ref={chartRef}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: ${value.toFixed(2)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${parseFloat(value).toFixed(2)}%`} />
            <Legend />
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
