import React, { useState } from "react";

function Report() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:5555/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ start_date: startDate, end_date: endDate }),
      });

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error("Internal server error. Please try again later.");
        }
        throw new Error(
          "Network response was not ok. Status: " + response.status
        );
      }

      const data = await response.json();
      setReportData(data);
    } catch (error) {
      setError(
        error.message || "Failed to fetch report data. Please try again."
      );
      console.error("Error fetching report data:", error);
    }
  };

  return (
    <div>
      <h1>Report Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Start Date:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            End Date:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Generate Report</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h2>Report Data</h2>
      {reportData.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Column 1</th>
              <th>Column 2</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((item, index) => (
              <tr key={index}>
                <td>{item.column1}</td>
                <td>{item.column2}</td>
                <td>{item.date_field}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available for the selected date range.</p>
      )}
    </div>
  );
}

export default Report;
