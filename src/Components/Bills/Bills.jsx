import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bills.css";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const billsPerPage = 3;

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          "http://192.168.3.236:3000/api/sales/show"
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
  const currentBills = bills
    .filter((bill) =>
      bill.customer.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(indexOfFirstBill, indexOfLastBill);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page number when searching
  };

  return (
    <div className="reports-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by customer name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="reports-container">
        {currentBills.length > 0 ? (
          currentBills.map((bill, index) => (
            <div key={index} className={`bill-container ${bill.status}`}>
              {bill.customer && (
                <div>
                  <h3>Customer Name: {bill.customer}</h3>
                  <p>Customer Email: {bill.customerMail}</p>{" "}
                  {/* Corrected property name */}
                </div>
              )}
              <p>Date: {bill.date}</p>
              {bill.product ? (
                <div>
                  <h4>Product Details:</h4>
                  <p>Name: {bill.product.name}</p>
                  <p>Price: ₹{bill.product.price}</p>
                  <p>Quantity: {bill.quantity}</p>
                </div>
              ) : (
                <p>No product details available</p>
              )}
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

export default Bills;
