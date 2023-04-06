import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const OnlinePlayersChart = ({ onlinePlayersData }) => {
  const [chart, setChart] = useState(null);

  useEffect(() => {
    if (onlinePlayersData) {
      const labels = onlinePlayersData.map((data) => data.timestamp);
      const data = onlinePlayersData.map((data) => data.playerCount);

      const ctx = document.getElementById("online-players-chart").getContext("2d");

      const newChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Online Players",
              data: data,
              borderColor: "#4a5568",
              backgroundColor: "rgba(74, 85, 104, 0.1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });

      setChart(newChart);
    }
  }, [onlinePlayersData]);

  return (
    <div className="nm-convex-secondary-sm container mx-auto p-5 max-w-full">
      <canvas id="online-players-chart" width="400" height="200"></canvas>
    </div>
  );
};

export default OnlinePlayersChart;