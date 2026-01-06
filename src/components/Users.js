import React, { useEffect, useState } from "react";
import { getAllUsers } from "../api/userService";
import "./Users.css";

function Users() {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const data = await getAllUsers();
    setUsers(data);
  };

  return (
    <div className="users-container">
      <h2 className="users-title">👤 User Information</h2>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Username</th>
              <th>Email</th>
              <th>Password (Encrypted)</th>
              <th>Role</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr key={user.userId}>
                <td>{index + 1}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td className="password-col">
                  {user.password.substring(0, 18)}...
                </td>
                <td>
                  <span className={`role-badge ${user.role.roleName}`}>
                    {user.role.roleName}
                  </span>
                </td>
                <td>{user.role.description || "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
