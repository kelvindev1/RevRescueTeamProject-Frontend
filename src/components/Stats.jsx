import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { color } from "chart.js/helpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function Stats() {
  const [visitData, setVisitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVisitData = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:5555/user_auth/api/visits"
        );
        if (!response.ok) throw new Error("Failed to fetch visit data");
        const data = await response.json();
        setVisitData([data]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitData();
  }, []);

  if (loading) return <p>Loading statistics...</p>;
  if (error) return <p>Error: {error}</p>;

  const chartData = {
    labels: visitData ? visitData.map((v) => v.date) : [],
    datasets: [
      {
        label: "Daily Logins",
        data: visitData ? visitData.map((v) => v.count) : [],
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        color: "rgba(0,0,0,0)",
        borderWidth: 2,
        fill: true,
      },
    ],
  };

  return (
    <div>
      <h2>Login Statistics</h2>
      <Line data={chartData} />
    </div>
  );
}

export default Stats;
