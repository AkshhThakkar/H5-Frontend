import React, { useState } from "react";
import axios from "axios";
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

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryClick = async (categoryId) => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `http://your-backend-api-url/products?category=${categoryId}`
      );
      setProducts(response.data.products);
      setSelectedCategory(categoryId);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="categories-page">
      <h1 className="page-title">Categories</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${
              selectedCategory === category.id ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category.id)}>
            <img
              src={category.image}
              alt={category.name}
              className="category-image"
            />
            <h2 className="category-name">{category.name}</h2>
          </div>
        ))}
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="products">
          {products.map((product) => (
            <div key={product.id} className="product">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
