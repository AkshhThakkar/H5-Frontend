import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./Inventory.css";
import Spinner from "./Spinner"; // Import the Spinner component
import Draggable from "react-draggable"; // Import Draggable component
import { FiFilter } from "react-icons/fi"; // Import Filter icon from react-icons/fi

function Inventory() {
  const [myData, setMyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false); // State for toggling the add product form
  const [totalPages, setTotalPages] = useState(0); // State for total number of pages
  const [categories, setCategories] = useState([
    "Electronics",
    "Clothing",
    "Books",
    "Sports",
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAddingProduct, setIsAddingProduct] = useState(false); // State for add product loading
  const draggableRef = useRef(null); // Ref for Draggable component

  const productsPerPage = 4;
  const maxPageButtons = 3;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(myData.length / productsPerPage));
  }, [myData]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://192.168.3.236:3000/api/products/getproducts"
      );
      setMyData(
        response.data.result.map((product) => ({
          ...product,
          base64Image: `data:${product.image.contentType};base64,${product.image.data}`,
        }))
      );
    } catch (error) {
      setError(error);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddProduct = async () => {
    try {
      setIsAddingProduct(true); // Set loading state to true
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("inventory", inventory);
      formData.append("category", category);
      formData.append("image", image);

      await axios.post(
        "http://192.168.3.236:3000/api/products/createProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchData();

      setName("");
      setPrice("");
      setInventory("");
      setCategory("");
      setImage(null);

      setShowAddProductForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsAddingProduct(false); // Set loading state back to false
    }
  };

  const handleCancel = () => {
    setShowAddProductForm(false);
    setName("");
    setPrice("");
    setInventory("");
    setCategory("");
    setImage(null);
  };

  const handlePagination = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      const firstPage = Math.max(
        1,
        pageNumber - Math.floor(maxPageButtons / 2)
      );
      const lastPage = Math.min(totalPages, firstPage + maxPageButtons - 1);
      setCurrentPage(pageNumber);
      setPagesToShow(
        Array.from(
          { length: lastPage - firstPage + 1 },
          (_, index) => firstPage + index
        )
      );
    }
  };

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    setIsDropdownOpen(false);
  };

  const renderPageButtons = () => {
    return pagesToShow.map((page) => (
      <button
        key={page}
        onClick={() => handlePagination(page)}
        className={currentPage === page ? "active" : ""}>
        {page}
      </button>
    ));
  };

  const renderCategoriesDropdown = () => {
    return (
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="category-select">
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    );
  };

  const [pagesToShow, setPagesToShow] = useState(
    Array.from({ length: maxPageButtons }, (_, index) => index + 1)
  );

  const filteredData = category
    ? myData.filter((product) => product.category === category)
    : myData;

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching data {error.message}</div>;
  }

  return (
    <div>
      <div className="filter-box">
        <div className="filter-icon">
          <FiFilter />
        </div>
        <div className="category-dropdown">{renderCategoriesDropdown()}</div>
      </div>
      <div className="product-list">
        {filteredData
          .slice(
            (currentPage - 1) * productsPerPage,
            currentPage * productsPerPage
          )
          .map((product, index) => (
            <div className="product" key={index}>
              <img
                className="image"
                src={product.base64Image}
                alt={product.name}
              />
              <p className="product-name">{product.name}</p>
              <p className="product-price">Price: ₹{product.price}</p>
              <p className="product-inventory">Stock: {product.inventory}</p>
            </div>
          ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePagination(currentPage - 1)}
          disabled={currentPage === 1}>
          {"<"}
        </button>
        {renderPageButtons()}
        <button
          onClick={() => handlePagination(currentPage + 1)}
          disabled={currentPage === totalPages}>
          {">"}
        </button>
      </div>
      {showAddProductForm && (
        <Draggable nodeRef={draggableRef}>
          <div className="add-product-form" ref={draggableRef}>
            <h2>Add New Product</h2>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Quantity"
              value={inventory}
              onChange={(e) => setInventory(e.target.value)}
            />
            <div className="category-input">{renderCategoriesDropdown()}</div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <div>
              <button onClick={handleAddProduct} disabled={isAddingProduct}>
                {isAddingProduct ? "Adding..." : "Add Product"}
              </button>
              <button onClick={handleCancel} className="cancel">
                Cancel
              </button>
            </div>
          </div>
        </Draggable>
      )}
      <button
        className="add-product-button"
        onClick={() => setShowAddProductForm(true)}>
        +
      </button>
    </div>
  );
}

export default Inventory;
