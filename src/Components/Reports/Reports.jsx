import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reports.css";

const Reports = () => {
  const [bills, setBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 6;

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          "http://192.168.3.237:5760/api/sales/show"
        );
        console.log("Response from backend:", response.data);
        setBills(response.data.result);
      } catch (error) {
        console.error("Error fetching bills:", error);
      }
    };

    fetchBills();
  }, []);

  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = bills.slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="reports-page">
      <div className="reports-container">
        {currentBills.length > 0 ? (
          currentBills.map((bill, index) => (
            <div key={index} className={`bill-container ${bill.status}`}>
              <h3>Product: {bill.product}</h3>
              <p>Price: ₹{bill.price}</p>
              <p>Quantity: {bill.quantity}</p>
            </div>
          ))
        ) : (
          <div>No bills available.</div>
        )}
      </div>
      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastBill >= bills.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Reports;
