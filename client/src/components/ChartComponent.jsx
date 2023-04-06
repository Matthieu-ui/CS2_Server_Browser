import React, { useEffect, useState } from "react";
import Chart from "chart.js";

const ChartComponent = ({ data }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (data) {
      const labels = data.map((d) => d.timestamp);
      const playerCounts = data.map((d) => d.playerCount);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Player Count",
            data: playerCounts,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };

      const ctx = document.getElementById("chart").getContext("2d");

      setChart(
        new Chart(ctx, {
          type: "line",
          data: chartData,
          options: {
            responsive: true,
            scales: {
              x: {
                type: "time",
                time: {
                  unit: "day",
                  displayFormats: {
                    day: "MMM D",
                  },
                },
              },
            },
          },
        })
      );
    }
  }, [data]);

  return <canvas id="chart" />;
};

export default ChartComponent;
