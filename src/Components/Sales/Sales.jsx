import React, { useState, useEffect } from "react";
import "./sales.css";

function Sales() {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [sum, setSum] = useState(0);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(
        "http://192.168.3.236:3000/api/products/getproducts"
      );
      const data = await response.json();
      setProducts(data.result); // Assuming data.result contains the array of products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function getProductDetailsByName(name) {
    const product = products.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (product) {
      setProductId(product._id);
      setPrice(product.price);
      calculateTotal(product.price, qty);
    } else {
      // Handle product not found case
      console.log("Product not found");
      setProductId("");
      setPrice(0);
      setSum(0);
    }
  }

  function Calculation() {
    if (name.trim() !== "") {
      const newUser = { customerName, email, name, qty, price, sum, productId };
      setUsers([...users, newUser]);

      const newTotal = users.reduce((total, user) => {
        return total + Number(user.sum);
      }, 0);

      setTotal(newTotal);

      // Clear form fields
      setName("");
      setQty(0);
      setPrice(0);
      setSum(0);
      setCustomerName("");
      setEmail("");
      setProductId("");
    }
  }

  const handleProductIdChange = (e) => {
    const newProductId = e.target.value;
    setProductId(newProductId);
    getProductDetails(newProductId);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    if (!isNaN(newPrice)) {
      setPrice(newPrice);
      calculateTotal(newPrice, qty);
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQty(newQuantity);
      calculateTotal(price, newQuantity);
    }
  };

  const calculateTotal = (price, qty) => {
    const newTotal = price * qty;
    setSum(newTotal);
  };

  function refreshPage() {
    window.location.reload();
  }

  return (
    <div className="container-fluid bg-2 text-center">
      <h1>Sales Management</h1>
      <div className="row">
        <div className="col-sm-8">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Customer Name"
                      style={{ color: "black" }}
                      value={customerName}
                      onChange={(event) => {
                        setCustomerName(event.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Email"
                      style={{ color: "black" }}
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Product Name</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Item Name"
                      style={{ color: "black" }}
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                        getProductDetailsByName(event.target.value);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Product ID</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product ID"
                      style={{ color: "black" }}
                      value={productId}
                      onChange={handleProductIdChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Price"
                      style={{ color: "black" }}
                      value={price}
                      onChange={handlePriceChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Quantity</th>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter Qty"
                      style={{ color: "black" }}
                      value={qty}
                      onChange={handleQuantityChange}
                    />
                  </td>
                </tr>
                <tr>
                  <th>Amount</th>
                  <td>
                    <input
                      type="text"
                      value={sum}
                      className="form-control"
                      style={{ color: "black", background: "white" }}
                      placeholder=""
                      id="total_cost"
                      name="total_cost"
                      disabled
                    />
                  </td>
                </tr>
                <tr>
                  <th>Confirm</th>
                  <td>
                    <button
                      className="btn btn-success"
                      type="submit"
                      onClick={Calculation}>
                      Add
                    </button>
                  </td>
                </tr>
              </thead>
            </table>
          </div>
        </div>
      </div>
      <h3 align="left">Details</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Item Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row, index) => (
            <tr key={index}>
              <td style={{ color: "white" }}>{row.name}</td>
              <td style={{ color: "white" }}>{row.price}</td>
              <td style={{ color: "white" }}>{row.qty}</td>
              <td style={{ color: "white" }}>{row.sum}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="col-sm-4">
        <div className="form-group" align="left">
          <h3>Total Amount</h3>
          <input
            type="text"
            className="form-control"
            placeholder="Total"
            style={{ color: "black", background: "white" }}
            required
            disabled
            value={total}
          />
          <br />
          <br />
          <button
            type="button"
            className="btn btn-success"
            onClick={refreshPage}>
            <span>Complete</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sales;
