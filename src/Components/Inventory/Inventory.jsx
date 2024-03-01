// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Inventory.css";
// import Spinner from "./Spinner"; // Import the Spinner component

// function Inventory() {
//   const [myData, setMyData] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(true); // Add isLoading state

//   const productsPerPage = 9;

//   useEffect(() => {
//     axios
//       .get("http://192.168.3.237:5760/api/products/getproducts")
//       .then((res) => {
//         console.log("Response data:", res.data);
//         if (Array.isArray(res.data)) {
//           setMyData(res.data.result);
//         } else if (typeof res.data === "object" && res.data !== null) {
//           const dataArray = Object.values(res.data.result);
//           if (Array.isArray(dataArray)) {
//             setMyData(dataArray);
//           } else {
//             setError(new Error("Invalid data format: Array expected"));
//           }
//         } else {
//           setError(new Error("Invalid data format: Array or object expected"));
//         }
//       })
//       .catch((error) => {
//         setError(error);
//         console.error("Error fetching data:", error);
//       })
//       .finally(() => {
//         setIsLoading(false); // Set isLoading to false when data fetching is complete
//       });
//   }, []);

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = myData.slice(indexOfFirstProduct, indexOfLastProduct);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   if (isLoading) {
//     // Render the spinner if isLoading is true
//     return <Spinner />;
//   }

//   if (error) {
//     return <div>Error fetching data: {error.message}</div>;
//   }

//   return (
//     <div>
//       <div className="product-list">
//         {currentProducts.map((product, index) => (
//           <div className="product" key={index}>
//             <p className="product-name">{product.name}</p>
//             <p className="product-price">Price: ₹{product.price}</p>
//             <p className="product-inventory">Stock: {product.inventory}</p>
//           </div>
//         ))}
//       </div>
//       <div className="pagination">
//         {Array.from({ length: Math.ceil(myData.length / productsPerPage) }).map(
//           (_, index) => (
//             <button key={index} onClick={() => paginate(index + 1)}>
//               {index + 1}
//             </button>
//           )
//         )}
//       </div>
//     </div>
//   );
// }

// export default Inventory;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Inventory.css";
import Spinner from "./Spinner"; // Import the Spinner component

function Inventory() {
  const [myData, setMyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add isLoading state
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [inventory, setInventory] = useState("");
  const [image, setImage] = useState(null);
  const [showAddProductForm, setShowAddProductForm] = useState(false); // State for toggling the add product form

  const productsPerPage = 9;

  useEffect(() => {
    axios
      .get("http://192.168.3.236:3000/api/products/getproducts")
      .then((res) => {
        console.log("Response data:", res.data);
        if (Array.isArray(res.data)) {
          setMyData(res.data.result);
        } else if (typeof res.data === "object" && res.data !== null) {
          const dataArray = Object.values(res.data.result);
          if (Array.isArray(dataArray)) {
            setMyData(dataArray);
          } else {
            setError(new Error("Invalid data format: Array expected"));
          }
        } else {
          setError(new Error("Invalid data format: Array or object expected"));
        }
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false); // Set isLoading to false when data fetching is complete
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = myData.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("inventory", inventory);
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

      // Refetch products after adding a new one
      const response = await axios.get(
        "http://192.168.3.236:3000/api/products/getproducts"
      );
      setMyData(response.data.result);

      // Reset form fields after successful submission
      setName("");
      setPrice("");
      setInventory("");
      setImage(null);

      // Hide the add product form
      setShowAddProductForm(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleCancel = () => {
    setShowAddProductForm(false); // Close the add product form
    // Reset form fields if needed
    setName("");
    setPrice("");
    setInventory("");
    setImage(null);
  };

  if (isLoading) {
    // Render the spinner if isLoading is true
    return <Spinner />;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <div className="product-list">
        {currentProducts.map((product, index) => (
          <div className="product" key={index}>
            <p className="product-name">{product.name}</p>
            <p className="product-price">Price: ₹{product.price}</p>
            <p className="product-inventory">Stock: {product.inventory}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(myData.length / productsPerPage) }).map(
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>

      {/* Add Product Form */}
      {showAddProductForm && (
        <div className="add-product-form">
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
            placeholder="Inventory"
            value={inventory}
            onChange={(e) => setInventory(e.target.value)}
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <div>
            <button onClick={handleAddProduct}>Add Product</button>
            <button
              onClick={handleCancel}
              style={{ backgroundColor: "#dc3545", width: "100%" }}>
              Cancel
            </button>
          </div>
        </div>
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
