import React from "react";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "axios";
import signUpSchema from "../../Schemas";
import Dashboard from "../Dashboard/Dashboard";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";

const initialValues = {
  name: "",
  password: "",
};
const Login = () => {
  function handleLogin(payload) {
    // event.preventDefault();
    axios
      .post("http://192.168.3.237:5760/api/user/login", payload)
      .then((res) => console.log(res))
      .catch((error) => console.log(error.response.data));
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        event.preventDefault();
        handleLogin(values);
        console.log("🚀 ~ Login ~ values:", values);
      },
    });
  console.log(" file: index.jsx ~ Login ~ errors", errors);
  <BrowserRouter>
    <Routes>
      <Route path="/home" element={<Dashboard />} />
    </Routes>
  </BrowserRouter>;
  const navigate = useNavigate();
  // const handleClick = () => navigate("/dashboard");
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="input-block">
          <label htmlFor="name" className="input-block">
            Name
          </label>
          <input
            id="name"
            type="name"
            name="name"
            style={{ color: "white" }}
            autoComplete="off"
            placeholder="Username"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name ? (
            <p className="form-error">{errors.name}</p>
          ) : null}
        </div>
        <div className="input-block">
          <label htmlFor="password" className="input-block">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            style={{ color: "white" }}
            autoComplete="off"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && touched.password ? (
            <p className="form-error">{errors.password}</p>
          ) : null}
        </div>
        <div className="modal-buttons">
          <button type="submit" className="input-button">
            Login
          </button>
          {/* <button onClick={handleClick} type="submit" className="input-button">
            Login
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default Login;
