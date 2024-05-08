import React, { useState, useEffect } from "react";
import "./Reports.css"; // Import the CSS file

const Reports = () => {
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [decodedImage, setDecodedImage] = useState(null);

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/report/monthlysales/5/2024"
        );
        const responseData = await response.json();

        if (
          !responseData ||
          !responseData.result ||
          !responseData.result.chartImageUrl
        ) {
          throw new Error("Invalid response format");
        }

        setMonthlyReport(responseData.result);

        // Decode the base64 image
        const base64Image = await fetch(responseData.result.chartImageUrl)
          .then((res) => res.arrayBuffer())
          .then((buffer) => {
            const binary = new Uint8Array(buffer).reduce((data, byte) => {
              return data + String.fromCharCode(byte);
            }, "");
            return `data:image/png;base64,${btoa(binary)}`;
          });

        setDecodedImage(base64Image);
      } catch (error) {
        console.error("Error fetching monthly report:", error);
      }
    };

    fetchMonthlyReport();
  }, []);

  return (
    <div className="reports-container">
      {monthlyReport && (
        <div>
          <h2 className="reports-header">Monthly Report 5-2024</h2>
          <ul className="reports-list">
            <li>Total Sales: {monthlyReport.totalSales}</li>
            <li>Total Profit: {monthlyReport.profit}</li>
          </ul>
          {decodedImage && (
            <img
              src={decodedImage}
              alt="Monthly Sales Chart"
              className="reports-image"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Reports;
