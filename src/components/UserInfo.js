import React from "react";
import "./UserInfo.css";

function UserInfo() {
  const token = localStorage.getItem("token");

  let user = {};
  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    user = {
      username: payload.sub,
      role: payload.roles?.join(", ") || "User",
      emailId: payload.email || "user@email.com",
      description: "Registered user of Online Bookstore",
      date: new Date(payload.iat * 1000).toLocaleDateString(),
      password: "********",
    };
  }

  return (
    <div className="user-container">
      <h2 className="user-title">👤 User Profile</h2>

      <div className="user-card">
        <div className="user-row">
          <span>Username</span>
          <p>{user.username}</p>
        </div>

        <div className="user-row">
          <span>Email</span>
          <p>{user.emailId}</p>
        </div>

        <div className="user-row">
          <span>Role</span>
          <p className="role">{user.role}</p>
        </div>

        <div className="user-row">
          <span>Description</span>
          <p>{user.description}</p>
        </div>

        <div className="user-row">
          <span>Account Created</span>
          <p>{user.date}</p>
        </div>

        <div className="user-row">
          <span>Password</span>
          <p>{user.password}</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
