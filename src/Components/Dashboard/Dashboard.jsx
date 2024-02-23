import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsFillPeopleFill,
  BsReceipt,
} from "react-icons/bs";

const Dashboard = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const productData = [
    {
      id: "inventory",
      title: "INVENTORY",
      value: 300,
      component: BsFillArchiveFill,
      path: "/inventory",
    },
    {
      id: "categories",
      title: "CATEGORIES",
      value: 12,
      component: BsFillGrid3X3GapFill,
      path: "/categories",
    },
    {
      id: "customers",
      title: "CUSTOMERS",
      value: 33,
      component: BsFillPeopleFill,
      path: "/customers",
    },
    {
      id: "reports",
      title: "REPORTS",
      value: 42,
      component: BsReceipt,
      path: "/reports",
    },
  ];

  const handleCardClick = (path) => {
    navigate(path); // Navigate to the specified path
  };

  const WrapperComp = ({ Component }) => <Component className="card_icon" />;

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>
      <div className="main-cards">
        {productData.map((data) => (
          <div
            className="card"
            key={data.id}
            onClick={() => handleCardClick(data.path)}>
            <div className="card-inner">
              <h3>{data.title}</h3>
              <WrapperComp Component={data.component} />
            </div>
            <h1>{data.value}</h1>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
