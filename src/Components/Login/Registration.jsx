import React, { useState } from "react";
import { useFormik } from "formik";
import SignupSchema from "../../Schemas/Registration";
import { Link } from "react-router-dom";
import axios from "axios";

const initialValues = {
  username: "",
  email: "",
  DOB: "",
  gender: "",
  password: "",
  //   confirm_password: "",
};

const Registration = () => {
  function handleRegister(payload) {
    axios
      .post("http://192.168.3.237:5760/api/user/register", payload)
      .then((res) => console.log(res))
      .catch((error) => console.log(error.response.data));
  }
  const [gender, setGender] = useState("Gender");
  function handleSelect(gender) {
    setGender(gender.target.value);
  }
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: SignupSchema,
      onSubmit: (values, action) => {
        handleRegister(values, action);
        console.log(
          "🚀 ~ file: Registration.jsx ~ line 11 ~ Registration ~ values",
          values
        );
        action.resetForm();
      },
    });
  console.log(
    "🚀 ~ file: Registration.jsx ~ line 25 ~ Registration ~ errors",
    errors
  );
  const genders = [
    {
      name: "male",
      value: "Male",
    },
    {
      name: "female",
      value: "Female",
    },
  ];
  return (
    <div className="container">
      <div className="modal">
        <div className="modal-container">
          <div className="modal-left">
            <form onSubmit={handleSubmit}>
              <div className="input-block">
                <label htmlFor="username" className="input-label">
                  Username
                </label>
                <input
                  type="username"
                  autoComplete="off"
                  name="username"
                  id="username"
                  placeholder="Username"
                  style={{ color: "white" }}
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.username && touched.username ? (
                  <p className="form-error">{errors.username}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="email" className="input-label">
                  Email
                </label>
                <input
                  type="email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  placeholder="Email"
                  style={{ color: "white" }}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className="form-error">{errors.email}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="Birthday" className="input-label">
                  DOB
                </label>
                <input
                  type="date"
                  autoComplete="off"
                  name="Birthday"
                  id="Birthday"
                  placeholder="DOB"
                  style={{ color: "white" }}
                  value={values.DOB}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.DOB && touched.DOB ? (
                  <p className="form-error">{errors.DOB}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="field" className="input-label">
                  Gender
                </label>
                <select
                  className="gender"
                  onChange={handleSelect}
                  value={gender}>
                  <option>--Select Your Gender--</option>
                  {genders.map((gender) => (
                    <>
                      <option value={gender.name}>{gender.value}</option>
                    </>
                  ))}
                </select>
                {errors.gender && touched.gender ? (
                  <p className="form-error">{errors.gender}</p>
                ) : null}
              </div>
              <div className="input-block">
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="password"
                  id="password"
                  placeholder="Password"
                  style={{ color: "white" }}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className="form-error">{errors.password}</p>
                ) : null}
              </div>
              {/* <div className="input-block">
                <label htmlFor="confirm_password" className="input-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  autoComplete="off"
                  name="confirm_password"
                  id="confirm_password"
                  placeholder="Confirm Password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirm_password && touched.confirm_password ? (
                  <p className="form-error">{errors.confirm_password}</p>
                ) : null}
              </div> */}
              <div className="modal-buttons">
                <button className="input-button" type="submit">
                  Register
                </button>
              </div>
            </form>
            <p className="sign-up">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
