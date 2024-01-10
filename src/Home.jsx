import React from "react";
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill,
} from "react-icons/bs";

function Home() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },

    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },

    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
              {/* <BsFillArchiveFill className='card_icon'/> */}
            </div>
            <h1>{data.value}</h1>
          </div>
        ))}
        {/* <div className='card'>
    <div className='card-inner'>
    <h3>CATEGORIES</h3>
    <BsFillGrid3X3GapFill className='card_icon'/>
    </div>
    <h1>12</h1>
    </div> */}
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
