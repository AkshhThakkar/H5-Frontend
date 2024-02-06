import React, { useState } from "react";

function Reports({ salesData }) {
  console.log(salesData);
  return (
    <div className="container">
      <h1>Sales Reports</h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {salesData &&
            salesData.map((sale, index) => (
              <tr key={index}>
                <td>{sale.name}</td>
                <td>{sale.price}</td>
                <td>{sale.qty}</td>
                <td>{sale.sum}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Reports;
