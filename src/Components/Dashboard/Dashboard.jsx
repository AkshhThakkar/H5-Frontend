import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  BsCalendar,
  BsFillArchiveFill,
  BsPeopleFill,
  BsReceipt,
} from "react-icons/bs";

const Dashboard = () => {
  const navigate = useNavigate();
  const productData = [
    {
      id: "suppliers",
      title: "SUPPLIERS",
      value: 12,
      component: BsPeopleFill,
      path: "/supply",
    },
    {
      id: "inventory",
      title: "INVENTORY",
      value: 300,
      component: BsFillArchiveFill,
      path: "/inventory",
    },
    {
      id: "bills",
      title: "BILLS",
      value: 42,
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
    </main>
  );
};

export default Dashboard;
