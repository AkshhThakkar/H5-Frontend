import React from "react";
import { useFormik } from "formik";
import signUpSchema from "../../Schemas";
import "./index.css";

const initialValues = {
  name: "",
  password: "",
};
const Login = () => {
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values) => {
        console.log("🚀 ~ Login ~ values:", values);
      },
    });
  console.log(" file: index.jsx ~ Login ~ errors", errors);

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
        </div>
      </form>
    </div>
  );
};

export default Login;
