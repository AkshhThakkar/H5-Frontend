import React, { useState, useEffect } from "react";

const Reports = () => {
  const [monthlyReport, setMonthlyReport] = useState(null);
  const [decodedImage, setDecodedImage] = useState(null);

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      try {
        const response = await fetch(
          "http://192.168.3.236:3000/api/report/monthlysales/3/2024"
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
            return btoa(binary);
          });

        setDecodedImage(`data:image/png;base64,${base64Image}`);
      } catch (error) {
        console.error("Error fetching monthly report:", error);
      }
    };

    fetchMonthlyReport();
  }, []);

  return (
    <div>
      {monthlyReport && (
        <div>
          <h2>
            Monthly Report ({monthlyReport.month}-{monthlyReport.year})
          </h2>
          <ul>
            <li>Total Sales: {monthlyReport.totalSales}</li>
            <li>Total Profit: {monthlyReport.profit}</li>
            {/* Add more report data as needed */}
          </ul>
          {decodedImage && <img src={decodedImage} alt="Monthly Sales Chart" />}
        </div>
      )}
    </div>
  );
};

export default Reports;
