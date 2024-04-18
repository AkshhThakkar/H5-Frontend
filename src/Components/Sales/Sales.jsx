// import React, { useState, useEffect } from "react";
// import "./sales.css";

// function Sales() {
//   const [price, setPrice] = useState(0);
//   const [qty, setQty] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [users, setUsers] = useState([]);
//   const [name, setName] = useState("");
//   const [sum, setSum] = useState(0);
//   const [customerName, setCustomerName] = useState("");
//   const [email, setEmail] = useState("");
//   const [productId, setProductId] = useState("");
//   const [products, setProducts] = useState([]);
//   const [errorFetchingProducts, setErrorFetchingProducts] = useState(false);
//   const [sendingDataError, setSendingDataError] = useState(null);

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   async function fetchProducts() {
//     try {
//       const response = await fetch(
//         "http://192.168.3.236:3000/api/products/getproducts"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch products");
//       }
//       const data = await response.json();
//       setProducts(data.result);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       setErrorFetchingProducts(true);
//     }
//   }

//   function getProductDetailsByName(name) {
//     const product = products.find(
//       (p) => p.name.toLowerCase() === name.toLowerCase()
//     );
//     if (product) {
//       setProductId(product._id);
//       setPrice(product.price);
//       calculateTotal(product.price, qty);
//     } else {
//       console.log("Product not found");
//       setProductId("");
//       setPrice(0);
//       setSum(0);
//     }
//   }

//   function Calculation() {
//     if (name.trim() !== "") {
//       const newUser = { customerName, email, name, qty, price, sum, productId };
//       setUsers((prevUsers) => [...prevUsers, newUser]);
//       const newTotal = total + Number(sum);
//       setTotal(newTotal);
//       setName("");
//       setQty(0);
//       setPrice(0);
//       setSum(0);
//       setCustomerName("");
//       setEmail("");
//       setProductId("");
//     }
//   }

//   async function sendSalesDataToBackend() {
//     try {
//       // Checking if customerName and email are not empty
//       if (!customerName || !email) {
//         throw new Error("Customer name and email are required.");
//       }

//       const formattedData = {
//         customer: customerName,
//         customermail: email,
//         products: users.map((user) => ({
//           productId: user.productId,
//           quantity: user.qty,
//         })),
//       };

//       const response = await fetch(
//         "http://192.168.3.237:5770/api/sales/update",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(formattedData),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to send sales data to backend");
//       }

//       console.log("Sales data sent to backend successfully");
//       setUsers([]);
//       setTotal(0);
//       setCustomerName("");
//       setEmail("");
//       setErrorFetchingProducts(false); // Resetting error state
//       window.location.reload();
//     } catch (error) {
//       console.error("Error sending sales data to backend:", error);
//       setSendingDataError(
//         "Failed to send sales data to backend. Please try again later."
//       );
//     }
//   }

//   const handleProductIdChange = (e) => {
//     const newProductId = e.target.value;
//     setProductId(newProductId);
//     getProductDetailsByName(newProductId);
//   };

//   const handlePriceChange = (e) => {
//     const newPrice = parseFloat(e.target.value);
//     if (!isNaN(newPrice)) {
//       setPrice(newPrice);
//       calculateTotal(newPrice, qty);
//     }
//   };

//   const handleQuantityChange = (e) => {
//     const newQuantity = parseInt(e.target.value);
//     if (!isNaN(newQuantity)) {
//       setQty(newQuantity);
//       calculateTotal(price, newQuantity);
//     }
//   };

//   const calculateTotal = (price, qty) => {
//     const newTotal = price * qty;
//     setSum(newTotal);
//   };

//   return (
//     <div className="container-fluid bg-2 text-center">
//       <h1>Sales Management</h1>
//       <div className="row">
//         <div className="col-sm-8">
//           {errorFetchingProducts && (
//             <p>Error fetching products. Please try again later.</p>
//           )}
//           <div className="table-responsive">
//             <table className="table table-bordered">
//               <thead>
//                 <tr>
//                   <th>Customer Name</th>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Customer Name"
//                       style={{ color: "black" }}
//                       value={customerName}
//                       onChange={(event) => {
//                         setCustomerName(event.target.value);
//                       }}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Email</th>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Email"
//                       style={{ color: "black" }}
//                       value={email}
//                       onChange={(event) => {
//                         setEmail(event.target.value);
//                       }}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Product Name</th>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Product Name"
//                       style={{ color: "black" }}
//                       value={name}
//                       onChange={(event) => {
//                         setName(event.target.value);
//                         getProductDetailsByName(event.target.value);
//                       }}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Product ID</th>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Product ID"
//                       style={{ color: "black" }}
//                       value={productId}
//                       onChange={handleProductIdChange}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Price</th>
//                   <td>
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Price"
//                       style={{ color: "black" }}
//                       value={price}
//                       onChange={handlePriceChange}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Quantity</th>
//                   <td>
//                     <input
//                       type="number"
//                       className="form-control"
//                       placeholder="Quantity"
//                       style={{ color: "black" }}
//                       value={qty}
//                       onChange={handleQuantityChange}
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Amount</th>
//                   <td>
//                     <input
//                       type="text"
//                       value={sum}
//                       className="form-control"
//                       style={{ color: "black", background: "white" }}
//                       placeholder="Amount"
//                       disabled
//                     />
//                   </td>
//                 </tr>
//                 <tr>
//                   <th>Confirm</th>
//                   <td>
//                     <button
//                       className="btn btn-success"
//                       type="submit"
//                       onClick={Calculation}>
//                       Add
//                     </button>
//                   </td>
//                 </tr>
//               </thead>
//             </table>
//           </div>
//         </div>
//       </div>

//       <h3 align="left">Details</h3>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Item Name</th>
//             <th>Price</th>
//             <th>Qty</th>
//             <th>Amount</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((row, index) => (
//             <tr key={index}>
//               <td style={{ color: "white" }}>{row.name}</td>
//               <td style={{ color: "white" }}>{row.price}</td>
//               <td style={{ color: "white" }}>{row.qty}</td>
//               <td style={{ color: "white" }}>{row.sum}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="col-sm-4">
//         <div className="form-group" align="left">
//           <h3>Total Amount</h3>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Total"
//             style={{ color: "black", background: "white" }}
//             required
//             disabled
//             value={total}
//           />
//           <br />
//           <br />
//           <button
//             type="button"
//             className="btn btn-success"
//             onClick={sendSalesDataToBackend}>
//             <span>Complete</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Sales;
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
  const [errorFetchingProducts, setErrorFetchingProducts] = useState(false);
  const [sendingDataError, setSendingDataError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products/getproducts"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data.result);
    } catch (error) {
      console.error("Error fetching products:", error);
      setErrorFetchingProducts(true);
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
      console.log("Product not found");
      setProductId("");
      setPrice(0);
      setSum(0);
    }
  }

  function Calculation() {
    if (name.trim() !== "") {
      const newUser = { customerName, email, name, qty, price, sum, productId };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      const newTotal = total + Number(sum);
      setTotal(newTotal);
      setName("");
      setQty(0);
      setPrice(0);
      setSum(0);
      setProductId("");
    }
  }

  async function sendSalesDataToBackend() {
    try {
      // Checking if customerName and email are not empty
      if (!customerName || !email) {
        throw new Error("Customer name and email are required.");
      }

      const formattedData = {
        customer: customerName,
        customermail: email,
        products: users.map((user) => ({
          productId: user.productId,
          quantity: user.qty,
        })),
      };

      const response = await fetch("http://localhost:3000/api/sales/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Failed to send sales data to backend");
      }

      console.log("Sales data sent to backend successfully");
      setUsers([]);
      setTotal(0);
      setCustomerName("");
      setEmail("");
      setErrorFetchingProducts(false); // Resetting error state
      window.location.reload();
    } catch (error) {
      console.error("Error sending sales data to backend:", error);
      setSendingDataError(
        "Failed to send sales data to backend. Please try again later."
      );
    }
  }

  const handleProductIdChange = (e) => {
    const newProductId = e.target.value;
    setProductId(newProductId);
    getProductDetailsByName(newProductId);
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

  return (
    <div className="container-fluid bg-2 text-center">
      <h1>Sales Management</h1>
      <div className="row">
        <div className="col-sm-8">
          {errorFetchingProducts && (
            <p>Error fetching products. Please try again later.</p>
          )}
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
                      placeholder="Product Name"
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
                      placeholder="Price"
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
                      placeholder="Quantity"
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
        {/* Sales details section */}
        <div className="col-sm-4">
          <div className="table-responsive">
            <table className="table table-bordered sales-details">
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
                    <td>{row.name}</td>
                    <td>{row.price}</td>
                    <td>{row.qty}</td>
                    <td>{row.sum}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="form-group" align="left">
            <h3>Total Amount</h3>
            <input
              type="text"
              className="form-control"
              placeholder="Total"
              value={total}
              disabled
            />
            <br />
            <br />
            <button
              type="button"
              className="btn btn-success"
              onClick={sendSalesDataToBackend}>
              <span>Complete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sales;
