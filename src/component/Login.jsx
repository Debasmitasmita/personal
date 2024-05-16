import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./LoginValidation";
import Validation from "./LoginValidation";
import AuthService from "../services/auth/AuthService";
import { AuthContext } from "../ContextApi/AuthContext";
function Login() {


  const { setisAuth, setAuthData } = useContext(AuthContext);
  // const [incorrect, setinCorrect] = useState(false);
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handelChange = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handelSubmit =async (event) => {
    event.preventDefault();

    console.log(values);
    // setErrors(Validation(values));
    // console.log(Validation(values));
    try {
      var apiLoginData = {
        loginId: values.email,
        password: values.password,
      };
      const loginRespose = await AuthService.login(apiLoginData);

      console.log("login ", loginRespose);
      if (loginRespose.success) {
        console.log("login Res", loginRespose);
        alert("Login Successfull");
        localStorage.setItem("token", loginRespose.accsessToken);
        setisAuth(true);
        setAuthData(loginRespose.login_info);
        navigate("/dashboard");
        // console.log("Register successful:", data);
        // onClose();
        //  onClose();
      } else {
        setisAuth(false);
        
        // setErrorMessage(data.message);
        // setLoading(false);
        // console.error("Login failed:", error.message);
      }
      // Redirect to dashboard or perform any other actions upon successful login
    } catch (error) {
      console.error("Login failed:", error.message);
      // Handle login error (e.g., display error message to user)
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign In</h2>
        <form action="" onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              required={true}
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
              placeholder="Enter Password"
              name="password"
              required={true}
              onChange={handelChange}
              className="form-control rounded-0"
            />
            {errors.password && (
              <span className="text-danger"> {errors.password} </span>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Log in
          </button>
          <p>You are agree to our teams and policies</p>
          <Link
            to="/signup"
            className="btn btn-default border w-100 rounded-0 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
