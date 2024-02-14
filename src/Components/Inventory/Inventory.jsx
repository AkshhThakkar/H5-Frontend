import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";

function Inventory() {
  const [myData, setMyData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://192.168.3.236:3000/api/products/getproducts")
      .then((res) => {
        console.log("Response data:", res.data);
        if (Array.isArray(res.data)) {
          setMyData(res.data);
        } else if (typeof res.data === "object" && res.data !== null) {
          const dataArray = Object.values(res.data);
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
      });
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  if (myData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {myData.map((product, index) => (
        <div key={index}>
          <p>{product.name}</p>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default Inventory;
