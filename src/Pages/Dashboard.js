import React from 'react';
import '../Styles/Dashboard.css';
import Project from './Project';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Projectcard from '../Components/Projectcard';
import { Link, Outlet } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Dashboard() {
 

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      
          <Navbar />
        <Outlet/>
        
    </div>
  );
}

export default Dashboard;
