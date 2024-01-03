import React from 'react';
import '../Styles/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div class="navbar container-fluid">
       
        <div className="wrapper">
          <div className="logo-Title"><a href="#"><span>Task Manager</span></a></div>
         
          <ul className="nav-links">
            <label for="close-btn" class="btn close-btn"><i class="fas fa-times"></i></label>
            <li><Link className='link' to="/login">LogIn</Link></li>
            <li><Link className='link' to="/signUp">SignUp</Link></li>
          </ul>
          <label for="menu-btn" class="btn menu-btn"><i class="fas fa-bars"></i></label>
        </div>
      
    </div>
  )
}

export default Navbar