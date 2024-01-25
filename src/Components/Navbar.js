import React, { useState, useEffect } from 'react';
import '../Styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
function Navbar() {
  const [username, setUsername] = useState(null);
  const navigate =useNavigate();

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    console.log('authToken:', authToken);

    if (authToken) {
      axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/username`, {
        headers: {
          Authorization: authToken,
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
    console.log('Before logout:', localStorage.getItem('authToken'));
  localStorage.removeItem('authToken');
  console.log('After logout:', localStorage.getItem('authToken'));
    if (window.location.pathname === '/') {
      window.location.reload();
    }
    else{
      navigate('/')
    }
  };

  return (
    <div className="navbar container-fluid">
      <div className="wrapper">
        <div className="logo-Title">
          <a href="#"><span>Task Manager</span></a>
        </div>
        <input type="radio" name="slider" id="menu-btn"/>
       <input type="radio" name="slider" id="close-btn"/>
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn"><CloseIcon/></label>
          {username ? (
            <>
              <li> <Link className='link' to="/dashboard"> {username}</Link></li>
              <li  onClick={handleLogout}> <Link className='link'>Logout</Link></li>
            </>
          ) : (
            <>
              <li><Link className='link' to="/login">LogIn</Link></li>
              <li><Link className='link' to="/signUp">SignUp</Link></li>
            </>
          )}
        </ul>
        <label htmlFor="menu-btn" className="btn menu-btn"><MenuIcon/></label>
      </div>
    </div>
  );
}

export default Navbar;
