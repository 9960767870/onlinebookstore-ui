import React, { useState } from "react";
import { login } from "../api/authService";
import "./Login.css";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await login({
        userName:userName,   // 🔥 backend usually expects "username"
        password
      });

      localStorage.setItem("token", res.token);
      onLoginSuccess(); // 🔥 notify App
    } catch (err) {
      setError("Invalid username or password");
      console.error(err);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Online Bookstore Login</h2>

        {error && <p className="error-text">{error}</p>}

        <input
          type="userName"
          placeholder="Username Or Email"
          required
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
{/* 
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /> */}

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
