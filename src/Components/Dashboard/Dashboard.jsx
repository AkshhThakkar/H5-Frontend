import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  BsBox2Fill,
  BsCalendar,
  BsFillArchiveFill,
  BsPeopleFill,
  BsReceipt,
} from "react-icons/bs";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [inventoryCount, setInventoryCount] = useState(0);
  const [billCount, setBillCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading animation
        const inventoryResponse = await axios.get(
          "http://192.168.3.236:3000/api/products/getproducts"
        );
        const inventoryData = inventoryResponse.data.result;
        const totalProductsInInventory = inventoryData.length;
        setInventoryCount(totalProductsInInventory);

        const billResponse = await axios.get(
          "http://192.168.3.236:3000/api/sales/show"
        );
        const billData = billResponse.data.result;
        const numberOfBills = billData.length;
        setBillCount(numberOfBills);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const productData = [
    {
      id: "supply",
      title: "SUPPLY",
      value: 12,
      component: BsBox2Fill,
      path: "/supply",
    },
    {
      id: "inventory",
      title: "INVENTORY",
      value: inventoryCount,
      component: BsFillArchiveFill,
      path: "/inventory",
    },
    {
      id: "bills",
      title: "BILLS",
      value: billCount,
      component: BsReceipt,
      path: "/bills",
    },
    {
      id: "reports",
      title: "REPORTS",
      value: 33,
      component: BsCalendar,
      path: "/reports",
    },
  ];

  const handleCardClick = (path) => {
    navigate(path);
  };

  const WrapperComp = ({ Component }) => <Component className="card-icon" />;

  return (
    <main className="main-container">
      <div className="main-title">
        <h1>DASHBOARD</h1>
      </div>
      <div className="main-cards">
        {productData.map((data, index) => (
          <div
            className="card"
            key={index}
            onClick={() => handleCardClick(data.path)}>
            <WrapperComp Component={data.component} />
            <div className="card-content">
              <h2>{data.title}</h2>
              <p>{data.value}</p>
            </div>
          </div>
        ))}
      </div>
      {loading && <div className="spinner" />}
    </main>
  );
};

export default Dashboard;
