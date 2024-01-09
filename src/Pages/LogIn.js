import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/LogIn.css';
import { useToast } from "@chakra-ui/toast";

function LogIn() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    userType: 'manager', // Default user type
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

const handleLogin = async () => {
  setLoading(true);
  try {
    const url = `http://localhost:5001/auth/${loginData.userType}login`;
    const res = await axios.post(url, loginData);

    
   console.log(res.data);

      // Save the token to localStorage or sessionStorage
      localStorage.setItem('authToken', res.data.token);

    toast({
      title: "Success",
      description: "Login Successful!",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "bottom-left",
    });

    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 2000);
  } catch (error) {
    console.error(`Error during login:`, error);
    if (error.response && error.response.status === 401) {
      setError('Invalid credentials');
    } else {
      setError(`${loginData.userType} login failed. Please try again.`);
    }
    setLoading(false);
  }
};


  return (
    <div className="container-body">
      <div className="container-login">
        <div className="title">Login</div>
        <div className="content">
          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="user-details">
              <div className="input-boxLogin">
                <span className="details">Username</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={loginData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-boxLogin">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-boxLogin">
                <span className="details">User Type</span>
                <select
                  name="userType"
                  value={loginData.userType}
                  onChange={handleChange}
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
            </div>
            <div className="button">
              <input type="submit" value="LogIn" />
              {/* ... other input fields ... */}
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default LogIn;
