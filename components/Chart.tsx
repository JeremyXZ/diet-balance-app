"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

interface ChartProps {
  omega6: number;
  omega3: number;
}

const RatioChart = ({ omega6, omega3 }: ChartProps) => {
  const data = {
    labels: ["Omega6", "Omega3"],
    datasets: [
      {
        data: [omega6, omega3],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "red", // This is how you set the color now
          font: {
            size: 20,
            weight: "bold",
            family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          },
        },
      },
    },
  };

  return (
    <div style={{ position: "fixed", top: 0, right: 0, zIndex: 1000 }}>
      <Doughnut data={data} width={150} height={150} options={options} />
    </div>
  );
};

export default RatioChart;
