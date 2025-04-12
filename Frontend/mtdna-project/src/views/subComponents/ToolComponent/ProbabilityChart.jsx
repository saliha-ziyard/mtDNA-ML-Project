import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

// Colors for the pie chart
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ProbabilityChart = ({ probabilities, chartRef }) => {
  // Prepare data for pie chart
  const preparePieChartData = () => {
    if (!probabilities) return [];
    
    return Object.entries(probabilities).map(([name, value]) => ({
      name,
      value
    }));
  };

  return (
    <div className="probability-chart">
      <h3>Probability Distribution</h3>
      <div style={{ width: '100%', height: 300 }} ref={chartRef}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={preparePieChartData()}
              cx="50%"
              cy="50%"
              labelLine={true}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {preparePieChartData().map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}%`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="probability-text">
        <h4>Detailed Probabilities:</h4>
        {Object.entries(probabilities).map(([category, prob]) => (
          <p key={category}>{category}: {prob}%</p>
        ))}
      </div>
    </div>
  );
};

export default ProbabilityChart;