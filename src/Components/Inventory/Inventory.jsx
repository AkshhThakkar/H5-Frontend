// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./Inventory.css";

// function Inventory() {
//   const [myData, setMyData] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios
//       .get("http://192.168.3.236:3000/api/products/getproducts")
//       .then((res) => {
//         console.log("Response data:", res.data);
//         if (Array.isArray(res.data)) {
//           setMyData(res.data);
//         } else if (typeof res.data === "object" && res.data !== null) {
//           const dataArray = Object.values(res.data);
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
//       });
//   }, []);

//   if (error) {
//     return <div>Error fetching data: {error.message}</div>;
//   }

//   if (myData.length === 0) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       {myData.map((product, index) => (
//         <div key={index}>
//           <p>{product.name}</p>
//           <p>{product.price}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default Inventory;
// AddProductForm.js
import React, { useState } from "react";
import axios from "axios";

const AddProductForm = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    imageFile: null,
    imageUrl: "",
    name: "",
    price: "",
    inventory: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "imageFile") {
      setFormData((prevState) => ({
        ...prevState,
        imageFile: e.target.files[0],
      }));
    } else {
      const { name, value } = e.target;
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageData = new FormData();
      imageData.append("image", formData.imageFile);
      // You can handle image upload separately from other form fields
      const imageResponse = await axios.post("/api/upload-image", imageData);
      const imageUrl = imageResponse.data.imageUrl;

      // Now add other product details along with imageUrl
      const productData = {
        ...formData,
        imageUrl: imageUrl,
      };
      await axios.post("/api/products", productData);
      onAdd();
      setFormData({
        imageFile: null,
        imageUrl: "",
        name: "",
        price: "",
        inventory: "",
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="file"
        name="imageFile"
        onChange={handleChange}
        accept="image/*"
        required
      />
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="number"
        name="inventory"
        value={formData.inventory}
        onChange={handleChange}
        placeholder="Inventory"
        required
      />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProductForm;
