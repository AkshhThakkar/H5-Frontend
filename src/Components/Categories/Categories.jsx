import React from "react";
import "./Categories.css";

const Categories = () => {
  // Sample category data (replace with your actual category data)
  const categories = [
    { id: 1, name: "Electronics", image: "electronics.jpg" },
    { id: 2, name: "Clothing", image: "clothing.jpg" },
    { id: 3, name: "Home & Kitchen", image: "home_kitchen.jpg" },
    { id: 4, name: "Books", image: "books.jpg" },
    { id: 5, name: "Sports & Outdoors", image: "sports_outdoors.jpg" },
    // Add more categories as needed
  ];

  return (
    <div className="categories-page">
      <h1 className="page-title">Categories</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <div key={category.id} className="category-card">
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <h2 className="category-name">{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
