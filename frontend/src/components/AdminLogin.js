import React, { useState, useEffect } from "react";
import axios from 'axios';
import './AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [userId, setUserId] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [error, setError] = useState("");
    const [systemUsers, setSystemUsers] = useState([]);
    
    // Fetch system users data from the database
    useEffect(() => {
        axios.get("http://localhost:8070/systemusers")
            .then(response => {
                setSystemUsers(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleLoginSuccess = () => {
        // Set isLoggedIn to true and save it to localStorage
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
    
        // Find the user with the entered employee ID
        const user = systemUsers.find(user => user.Emp_ID === userId);
        
        // Redirect based on user type
        switch (user.Emp_Type) {
            case "Administrator":
                // Redirect to Admin Home
                window.location.href = "/admin-home";
                break;
            case "Manager":
                // Redirect to Manager Dashboard
                window.location.href = "/manager/dashboard";
                break;
            case "User":
                // Redirect to User Dashboard
                window.location.href = "/user/dashboard";
                break;
            default:
                setError("Invalid User Type");
        }
    };
    

    const handleLogout = () => {
        // Set isLoggedIn to false and remove it from localStorage
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
    };

    const handleLogin = (e) => {
        e.preventDefault();
        
        // Find the user with the entered employee ID
        const user = systemUsers.find(user => user.Emp_ID === userId);
        
        if (!user) {
            setError("Invalid User ID");
            return;
        }

        // Check if the entered password matches the user's password
        if (user.password !== userPassword) {
            setError("Incorrect Password");
            return;
        }
        
        // Set isLoggedIn to true upon successful login
        handleLoginSuccess();
    };

    return (
        <div className="login-container">
            
                <>
                    <h2 style={{textAlign:"center"}}>Login</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleLogin}>
                    <div className="form-group">
                    <label>User ID:</label>
                        <input
                            type="text"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit">Login</button>
                    </form>
                </>
           
        </div>
    );
};

export default AdminLogin;
