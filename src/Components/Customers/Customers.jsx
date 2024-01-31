// import React from "react";

// const Customers = () => {
//   return <div>Customers Page</div>;
// };

// export default Customers;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Customers = () => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetch("/api/customers/1")
      .then((response) => response.json())
      .then((data) => setCustomer(data));
  }, []);

  if (!customer) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Customer Information</h1>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <p>Address: {customer.address}</p>
      <Link to="/customers">Back to Customers</Link>
    </div>
  );
};

export default Customers;
