import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
  BsFillPeopleFill,
} from "react-icons/bs";
function Home() {
  const productData = [
    {
      id: "products",
      title: "PRODUCTS",
      value: 300,
      component: BsFillArchiveFill,
    },
    {
      id: "catagories",
      title: "CATEGORIES",
      value: 12,
      component: BsFillGrid3X3GapFill,
    },
    {
      id: "customers",
      title: "CUSTOMERS",
      value: 33,
      component: BsFillPeopleFill,
    },
    {
      id: "alerts",
      title: "ALERTS",
      value: 42,
      component: BsFillBellFill,
    },
  ];

  const WrapperComp = ({ Component }) => <Component className="card_icon" />;

  return (
    <main className="main-container">
      <div className="main-title">
        <h3>DASHBOARD</h3>
      </div>

      <div className="main-cards">
        {productData.map((data) => (
          <div className="card">
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
}

export default Home;
