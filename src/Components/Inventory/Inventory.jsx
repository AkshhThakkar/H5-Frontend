import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";
import Spinner from "./Spinner"; // Import the Spinner component

function Inventory() {
  const [myData, setMyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [image, setImage] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false); // State for toggling the add product form
  const [totalPages, setTotalPages] = useState(0); // State for total number of pages

  const productsPerPage = 3;
  const maxPageButtons = 3;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(myData.length / productsPerPage));
  }, [myData]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.3.236:3000/api/products/getproducts"
      );
      setMyData(response.data.result);
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("inventory", inventory);
      formData.append("image", image);

      await axios.post(
        "http://192.168.3.236:3000/api/products/createProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchData();

      // Reset form fields after successful submission
      setName("");
      setPrice("");
      setInventory("");
      setImage(null);

      // Hide the add product form
      setShowAddProductForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCancel = () => {
    setShowAddProductForm(false); // Close the add product form
    // Reset form fields if needed
    setName("");
    setPrice("");
    setInventory("");
    setImage(null);
  };

  const handlePagination = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      // Adjust page buttons when clicking arrow buttons
      const firstPage = Math.max(
        1,
        pageNumber - Math.floor(maxPageButtons / 2)
      );
      const lastPage = Math.min(totalPages, firstPage + maxPageButtons - 1);
      setCurrentPage(pageNumber);
      setPagesToShow(
        Array.from(
          { length: lastPage - firstPage + 1 },
          (_, index) => firstPage + index
        )
      );
    }
  };

  const renderPageButtons = () => {
    return pagesToShow.map((page) => (
      <button
        key={page}
        onClick={() => handlePagination(page)}
        className={currentPage === page ? "active" : ""}>
        {page}
      </button>
    ));
  };

  const [pagesToShow, setPagesToShow] = useState(
    Array.from({ length: maxPageButtons }, (_, index) => index + 1)
  );

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
        {myData
          .slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
          )
          .map((product, index) => (
            <div className="product" key={index}>
              <img
                className="image"
                src={product.imageurl}
                alt={product.name}
              />
              <p className="product-name">{product.name}</p>
              <p className="product-price">Price: ₹{product.price}</p>
              <p className="product-inventory">Stock: {product.inventory}</p>
            </div>
          ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}>
          {"<"}
        </button>
        {renderPageButtons()}
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}>
          {">"}
        </button>
      </div>
      {showAddProductForm && (
        <div className="add-product-form">
          <h2>Add New Product</h2>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Inventory"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div>
            <button onClick={handleAddProduct}>Add Product</button>
            <button onClick={handleCancel} className="cancel">
              Cancel
            </button>{" "}
            {/* Cancel button */}
          </div>
        </div>
      )}
      <button
        className="add-product-button"
        onClick={() => setShowAddProductForm(true)}>
        +
      </button>
    </div>
  );
}

export default Inventory;
