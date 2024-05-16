import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./SignupValidation";
import AuthService from "../services/auth/AuthService";
function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handelChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handelSubmit = async (event) => {
    event.preventDefault();
    // setErrors(Validation(values));
    // console.log(values);
    console.log("Register Data", values);
    var registerData = {
      apiKey: "1234567",
      projectName: "projectOne",
      userName: values.name,
      email: values.email,
      password: values.password,
    };
    console.log("registerData", registerData);
    try {
      const data = await AuthService.register(registerData);

      if (data.success) {
        console.log("Register successful:", data);
        alert("Register successful");
        navigate("/Login");
        // onClose()
      } else {
        alert(data.message);
        // setErrorMessage(data.message);
        // setLoading(false);
        // console.error("Login failed:", error.message);
      }
      // Redirect to dashboard or perform any other actions upon successful login
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      alert(error.message);
      console.error("Login failed:", error.message);
      // Handle login error (e.g., display error message to user)
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary  vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>
        <form action="" onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="fullname">
              <strong>Full Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Full Name"
              name="name"
              required={true}
              onChange={handelChange}
              className="form-control rounded-0"
            />
            {errors.name && (
              <span className="text-danger"> {errors.name} </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              required={true}
              placeholder="Enter Email"
              name="email"
              onChange={handelChange}
              className="form-control rounded-0"
            />
            {errors.email && (
              <span className="text-danger"> {errors.email} </span>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              required={true}
              placeholder="Enter password"
              name="password"
              onChange={handelChange}
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger"> {errors.password} </span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign Up
          </button>
          <p>You are agree to our teams and policies</p>
          <Link
            to="/"
            className="btn btn-default border w-100 rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
