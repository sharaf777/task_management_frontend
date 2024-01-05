import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/LogIn.css';

function UserRegister() {
  const [managerData, setManagerData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setManagerData({ ...managerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5001/auth/userregister";

      // Get the admin token from localStorage or wherever it is stored
      const adminToken = localStorage.getItem('adminToken');

      // Set the adminToken in the request headers for authentication
      const config = {
        headers: {
          Authorization: adminToken, // No "Bearer" prefix here
        },
      };

      const res = await axios.post(url, managerData, config);
      console.log(managerData);
      console.log(res);
      
      // Show success alert
      alert('User registered successfully!');
      
      // Navigate to the home page
      navigate("/");
    } catch (error) {
      console.error('Error during manager registration:', error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.error('Detailed error response from the server:', error.response.data);
        setError(error.response.data.message);
      } else {
        // Show a general error message
        setError('Manager registration failed. Please try again.');
        alert('Manager registration failed!');
      }
    }
  };

  return (
    <div className="container-body">
      <div className="container-login">
        <div className="title">Create User</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-boxLogin">
                <span className="details">Username</span>
                <input
                  type="text"
                  placeholder="Enter user's name"
                  name="username"
                  value={managerData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-boxLogin">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter manager's password"
                  name="password"
                  value={managerData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Register" />
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
