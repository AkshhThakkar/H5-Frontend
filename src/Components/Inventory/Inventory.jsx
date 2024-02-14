import { React, useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";

function Inventory() {
  const [myData, setMyData] = useState([]);

  useEffect(() => {
    axios
      .get("http://192.168.3.237:5760/api/products/getProducts")
      .then((res) => {
        setMyData(res.data);
        console.log("Data received:", res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log("myData:", myData);
  return console.log("MYDATA", myData);
}

export default Inventory;
