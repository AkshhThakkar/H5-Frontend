import React from "react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  BsCalendar,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsReceipt,
} from "react-icons/bs";

const Dashboard = () => {
  const navigate = useNavigate();
  const productData = [
    {
      id: "categories",
      title: "CATEGORIES",
      value: 12,
      component: BsFillGrid3X3GapFill,
      path: "/categories",
    },
    {
      id: "inventory",
      title: "INVENTORY",
      value: 300,
      component: BsFillArchiveFill,
      path: "/inventory",
    },
    {
      id: "reports",
      title: "REPORTS",
      value: 42,
      component: BsReceipt,
      path: "/reports",
    },
    {
      id: "monthlyreports",
      title: "MONTHLY-REPORT",
      value: 33,
      component: BsCalendar,
      path: "/month-reports",
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
