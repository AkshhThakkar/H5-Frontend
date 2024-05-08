import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Suppliers.css"; // Import your CSS file for styling

const Supply = () => {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [quantityToAdd, setQuantityToAdd] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/products/getproducts"
      );
      setProducts(response.data.result);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleProductNameChange = (e) => {
    const newName = e.target.value;
    setProductName(newName);
    const product = products.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    if (product) {
      setProductId(product._id);
    } else {
      setProductId("");
    }
  };

  const handleProductNamePaste = (e) => {
    e.preventDefault();
    const newName = e.clipboardData.getData("text/plain");
    setProductName(newName);
    const product = products.find(
      (p) => p.name.toLowerCase() === newName.toLowerCase()
    );
    if (product) {
      setProductId(product._id);
    } else {
      setProductId("");
    }
  };

  const handleQuantityChange = (e) => {
    setQuantityToAdd(e.target.value);
  };

  const handleAddQuantity = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/products/supply",
        {
          productId,
          quantityToAdd: parseInt(quantityToAdd),
        }
      );
      toast.success(response.data.message);
      // Reset form fields after successful operation
      setProductName("");
      setProductId("");
      setQuantityToAdd("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="supply-container">
      <ToastContainer />
      <h2 className="supply-heading">Update Product Quantity</h2>
      <div className="form-container">
        <div className="input-group">
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={handleProductNameChange}
            onPaste={handleProductNamePaste}
          />
        </div>

        <div className="input-group">
          <label>Product ID:</label>
          <input
            type="text"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            disabled
            style={{ backgroundColor: "#fff" }}
          />
        </div>
        <div className="input-group">
          <label>Quantity to Add:</label>
          <input
            type="number"
            value={quantityToAdd}
            onChange={handleQuantityChange}
          />
        </div>
        <button className="btn" onClick={handleAddQuantity}>
          Add Quantity
        </button>
      </div>
    </div>
  );
};

export default Supply;
