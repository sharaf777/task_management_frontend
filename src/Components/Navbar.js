import React, { useState, useEffect } from 'react';
import '../Styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Navbar() {
  const [username, setUsername] = useState(null);
  const navigate =useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      axios.get('http://localhost:5001/auth/adminname', {
        headers: {
          Authorization: adminToken,
        },
      })
      .then(response => {
        setUsername(response.data.username);
      })
      .catch(error => {
        console.error('Error fetching admin name:', error.message);
      });
    }
  }, []);

  const handleLogout = () => {
    // Implement logout logic, clear the token, redirect, etc.
    console.log('Before logout:', localStorage.getItem('adminToken'));
  localStorage.removeItem('adminToken');
  console.log('After logout:', localStorage.getItem('adminToken'));
    navigate('/head')
  };

  return (
    <div className="navbar container-fluid">
      <div className="wrapper">
        <div className="logo-Title">
          <a href="#"><span>Task Manager</span></a>
        </div>

        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
          {username ? (
            <>
              <li> <Link className='link'> {username}</Link></li>
              <li  onClick={handleLogout}> <Link className='link'>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link className='link' to="/login">LogIn</Link></li>
              <li><Link className='link' to="/signUp">SignUp</Link></li>
            </>
          )}
        </ul>
        <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
      </div>
    </div>
  );
}

export default Navbar;
