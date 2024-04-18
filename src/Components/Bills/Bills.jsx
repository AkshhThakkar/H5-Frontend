import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Bills.css";

const Bills = () => {
  const [bills, setBills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const billsPerPage = 4;

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/sales/show"
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
                  <h4 style={{ fontSize: "1.2em" }}>Customer Details:</h4>
                  <p style={{ fontSize: "1.1em" }}>
                    Customer Name: {bill.customer}
                  </p>
                  <p style={{ fontSize: "1.1em" }}>
                    Customer Email: {bill.customermail}
                  </p>{" "}
                  {/* Corrected property name */}
                </div>
              )}
              <p style={{ fontSize: "1.1em" }}>Date: {bill.date}</p>
              {bill.product ? (
                <div>
                  <h4 style={{ fontSize: "1.2em" }}>Product Details:</h4>
                  <p style={{ fontSize: "0.95em" }}>
                    Name: {bill.product.productName}
                  </p>
                  <p style={{ fontSize: "1.1em" }}>Price: ₹{bill.price}</p>
                  <p style={{ fontSize: "1.1em" }}>Quantity: {bill.quantity}</p>
                  <p style={{ fontSize: "1.1em" }}>
                    Total Amount: {bill.amount}
                  </p>
                </div>
              ) : (
                <p style={{ fontSize: "1.1em" }}>
                  No product details available
                </p>
              )}
            </div>
          ))
        ) : (
          <div>No bills available.</div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          position: "fixed",
          marginBottom: "50px",
          marginLeft: "100px",
          bottom: 20,
          left: 0,
          right: 0,
        }}>
        <button
          style={{
            marginRight: 10,
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: 7,
            transition: "background-color 0.3s ease",
          }}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}>
          Previous
        </button>
        <button
          style={{
            padding: "10px 15px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: 7,
            transition: "background-color 0.3s ease",
          }}
          onClick={() => paginate(currentPage + 1)}
          disabled={
            indexOfLastBill >= bills.length || currentBills.length === 0
          }>
          Next
        </button>
      </div>
    </div>
  );
};

export default Bills;
