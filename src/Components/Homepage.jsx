import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
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
      component: BsPeopleFill,
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
        <div className="card">
          <div className="card-inner">
            <h3>CUSTOMERS</h3>
            <BsPeopleFill className="card_icon" />
          </div>
          <h1>33</h1>
        </div>
        <div className="card">
          <div className="card-inner">
            <h3>ALERTS</h3>
            <BsFillBellFill className="card_icon" />
          </div>
          <h1>42</h1>
        </div>
      </div>
    </main>
  );
}

export default Home;
