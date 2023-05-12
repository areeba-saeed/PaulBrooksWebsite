import React, { useState, useEffect } from "react";
import "./login.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    var { uname, pass } = document.forms[0];

    axios
      .post("https://paulbrooksapi.doctorsforhealth.co.uk/admin/login", {
        username: uname.value,
        password: pass.value,
      })
      .then((response) => {
        setIsSubmitted(true);
        localStorage.setItem("loggedIn", true);
        navigate("/dashboard");
        window.location.reload();
      })
      .catch((error) => {
        setErrorMessage(error.response.data);
        setIsSubmitted(false);
      });
  };

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          {isSubmitted ? (
            ""
          ) : (
            <div style={{ color: "red", fontSize: 15 }}>{errorMessage}</div>
          )}
          <label>Username </label>
          <input type="text" name="uname" required />
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="login">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
};

export default Login;
