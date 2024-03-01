import React, { useState } from "react";
import "./sales.css";

function Sales() {
  const [price, setPrice] = useState(0);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [sum, setSum] = useState(0);

  function Calculation() {
    // Check if name has a value before adding
    if (name.trim() !== "") {
      users.push({ name, qty, price, sum });

      const newTotal = users.reduce((total, user) => {
        return total + Number(user.sum);
      }, 0);

      setTotal(newTotal);

      // Clear the input fields
      setName("");
      setQty(0);
      setPrice(0);
      setSum(0);
    }
  }

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
      <br />
      <div className="row">
        <div className="col-sm-8">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>Option</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Item Name"
                    style={{ color: "black" }}
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                  />
                </td>
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
                <td>
                  <button
                    className="btn btn-success"
                    type="submit"
                    onClick={Calculation}>
                    Add
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <h3 align="left"> Products </h3>
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
        </div>

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
    </div>
  );
}

export default Sales;
