import React, { useState } from "react";
import BookList from "./BookList";
import Orders from "./Orders";
import "./Dashboard.css";
import Users from "./Users";

function Dashboard({ onLogout }) {
  const [activePage, setActivePage] = useState("books");

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h3 className="logo">📘 Book Store</h3>

        <button
          className={activePage === "books" ? "active" : ""}
          onClick={() => setActivePage("books")}
        >
          📚 Books
        </button>

        <button
          className={activePage === "orders" ? "active" : ""}
          onClick={() => setActivePage("orders")}
        >
          📦 Orders
        </button>

        <button
          className={activePage === "user" ? "active" : ""}
          onClick={() => setActivePage("user")}
        >
          👤 User Info
        </button>

        <button className="logout" onClick={onLogout}>
          🚪 Logout
        </button>
      </div>

      {/* Content */}
      <div className="content">
        {activePage === "books" && <BookList />}
        {activePage === "orders" && <Orders />}
        {activePage === "user" && <Users/>}
      </div>
    </div>
  );
}

export default Dashboard;
