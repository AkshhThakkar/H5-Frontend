import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";
import Spinner from "./Spinner"; // Import the Spinner component

function Inventory() {
  const [myData, setMyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state

  const productsPerPage = 9;

  useEffect(() => {
    axios
      .get("http://192.168.3.237:5760/api/products/getproducts")
      .then((res) => {
        console.log("Response data:", res.data);
        if (Array.isArray(res.data)) {
          setMyData(res.data.result);
        } else if (typeof res.data === "object" && res.data !== null) {
          const dataArray = Object.values(res.data.result);
          if (Array.isArray(dataArray)) {
            setMyData(dataArray);
          } else {
            setError(new Error("Invalid data format: Array expected"));
          }
        } else {
          setError(new Error("Invalid data format: Array or object expected"));
        }
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false when data fetching is complete
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = myData.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (isLoading) {
    // Render the spinner if isLoading is true
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <div className="product-list">
        {currentProducts.map((product, index) => (
          <div className="product" key={index}>
            <p className="product-name">{product.name}</p>
            <p className="product-price">Price: ₹{product.price}</p>
            <p className="product-inventory">Stock: {product.inventory}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(myData.length / productsPerPage) }).map(
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Inventory;
