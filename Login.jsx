import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Password validation function
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password, email, firstName, lastName, phone } = formData;

    if (isLogin) {
      if (!username || !password) {
        setMessage("Please enter both username and password.");
        setMessageType("error");
        return;
      }

      if (username === "admin") {
        localStorage.setItem("isAdmin", "true");
        setMessage("Admin login successful!");
        setMessageType("success");
        navigate("/dashboard");
      } else {
        localStorage.setItem("isAdmin", "false");
        setMessage("Login successful!");
        setMessageType("success");
        navigate("/events");
      }
    } else {
      if (!username || !firstName || !lastName || !email || !phone || !password) {
        setMessage("Please fill out all fields.");
        setMessageType("error");
        return;
      }

      if (!isValidPassword(password)) {
        setMessage("Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
        setMessageType("error");
        return;
      }

      setMessage("Account created successfully!");
      setMessageType("success");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh"
      }}
    >
      <form onSubmit={handleSubmit} className="wide-form">
        <h2 style={{ textAlign: "center", marginBottom: "25px" }}>
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <div style={{ marginBottom: "20px" }}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        {!isLogin && (
          <>
            <div style={{ marginBottom: "20px" }}>
              <label>First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />
            </div>
          </>
        )}

        <div style={{ marginBottom: "20px" }}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: isLogin ? "#007bff" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            cursor: "pointer"
          }}
        >
          {isLogin ? "Login" : "Create Account"}
        </button>

        {message && (
          <div
            style={{
              color: messageType === "error" ? "red" : "green",
              textAlign: "center",
              marginTop: "15px"
            }}
          >
            {message}
          </div>
        )}

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          {isLogin ? (
            <>
              Don’t have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
              >
                Create one
              </span>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
              >
                Login
              </span>
            </>
          )}
        </p>
      </form>
    </div>
  );
};

export default Login;
