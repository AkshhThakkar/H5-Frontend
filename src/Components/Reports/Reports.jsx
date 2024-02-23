import React, { useState } from "react";
import "./Reports.css";

const Reports = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const billsPerPage = 6; // Adjust to display 6 bills per page for pagination

  // Assuming bills is an array containing your bill data with status
  const bills = [
    { id: 1, name: "Bill 1", amount: 900, status: "paid" },
    { id: 2, name: "Bill 2", amount: 500, status: "pending" },
    { id: 3, name: "Bill 3", amount: 399, status: "paid" },
    { id: 4, name: "Bill 4", amount: 830, status: "paid" },
    { id: 5, name: "Bill 5", amount: 590, status: "paid" },
    { id: 6, name: "Bill 6", amount: 623, status: "pending" },
    { id: 7, name: "Bill 7", amount: 1000, status: "paid" },
    { id: 8, name: "Bill 8", amount: 200, status: "pending" },
    { id: 9, name: "Bill 9", amount: 300, status: "paid" },
    { id: 28, name: "Bill 28", amount: 2800, status: "pending" },
    // Add more bills here
  ];

  // Calculate index of the first and last bill on the current page
  const indexOfLastBill = currentPage * billsPerPage;
  const indexOfFirstBill = indexOfLastBill - billsPerPage;
  const currentBills = bills.slice(indexOfFirstBill, indexOfLastBill);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="reports-page">
      <div className="reports-container">
        {currentBills.map((bill) => (
          <div key={bill.id} className={`bill-container ${bill.status}`}>
            <h3>{bill.name}</h3>
            <p>Amount: ₹{bill.amount}</p>
            <p>Status: {bill.status}</p>
          </div>
        ))}
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
