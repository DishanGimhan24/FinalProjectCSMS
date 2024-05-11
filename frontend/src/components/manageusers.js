import React, { useState, useEffect } from "react";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import logo from "../images/logo.jpg"; // Ensure this path is correct
import "./manageusers.css";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8070/Customer/");
      setUsers(response.data);
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredUsers = _.filter(users, (user) =>
    user.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const calculateStatistics = () => {
    const totalCustomers = users.filter(user => user.type === "Customer").length;
    const totalDrivers = users.filter(user => user.type === "Driver").length;
    const totalUsers = users.length;
    const customerPercentage = (totalCustomers / totalUsers) * 100;
    const driverPercentage = (totalDrivers / totalUsers) * 100;

    // Age category statistics
    const ageCategories = {
      under30: filteredUsers.filter(user => user.age < 30).length,
      between30And50: filteredUsers.filter(user => user.age >= 30 && user.age <= 50).length,
      over50: filteredUsers.filter(user => user.age > 50).length
    };

    return { totalCustomers, totalDrivers, customerPercentage, driverPercentage, ageCategories };
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/Customer/delete/${id}`);
      getUsers();
    } catch (error) {
      alert(error.message);
    }
  };

  const { totalCustomers, totalDrivers, customerPercentage, driverPercentage, ageCategories } = calculateStatistics();

  return (
    <div className="center-container">
      {/* Logo */}
      <img src={logo} alt="Logo" className="logo-img" />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by type..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />

      {/* User List */}
      <div className="user-list">
        <h2>All Users</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Type</th>
              <th>Driving Experience</th>
              <th>License Year</th>
              <th>Profile Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.address}</td>
                <td>{user.age}</td>
                <td>{user.type}</td>
                <td>{user.type === "Driver" ? user.drivingExperience : "-"}</td>
                <td>{user.type === "Driver" ? user.licenseYear : "-"}</td>
                <td>
                  {user.profileImage ? (
                    <img src={`http://localhost:8070/${user.profileImage}`} alt="Profile" className="profile-img" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td>
                  <Link to={`/update/${user._id}`}>Update</Link>
                  <button className="delete-button" style={{ color: "white", backgroundColor: "red" }} onClick={() => deleteUser(user._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Statistics Container */}
      <div className="statistics-container">
        {/* Age category statistics */}
        <div className="age-stats">
          <h3>Age Category Statistics</h3>
          <p>Under 30: {ageCategories.under30}</p>
          <p>Between 30 and 50: {ageCategories.between30And50}</p>
          <p>Over 50: {ageCategories.over50}</p>
        </div>

        {/* User type statistics */}
        <div className="user-stats">
          <h3>User Type Statistics</h3>
          <p>Total Customers: {totalCustomers}</p>
          <p>Total Drivers: {totalDrivers}</p>
          <p>Customer Percentage: {customerPercentage}%</p>
          <p>Driver Percentage: {driverPercentage}%</p>
        </div>
      </div>
    </div>
  );
}
