import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/LogIn.css';

function LogIn() {
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5001/auth/adminlogin";
      const res = await axios.post(url, loginData);
      console.log(res.data);

      // Save the token to localStorage or sessionStorage
      localStorage.setItem('adminToken', res.data.token);

      // Navigate to the home page
      navigate('/');
    } catch (error) {
      console.error('Error during login:', error);
      if (
        error.response &&
        error.response.status === 401
      ) {
        setError('Invalid credentials');
      } else {
        setError('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className="container-body">
      <div className="container-login">
        <div className="title">Admin LogIn</div>
        <div className="content">
          <form onSubmit={handleLogin}>
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
            </div>
            <div className="button">
              <input type="submit" value="LogIn" />
              <p className="centered-text">
                Not a member{' '}
                <Link className='link' to="/signUp">
                  Register
                </Link>{' '}
                Now
              </p>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default LogIn;
