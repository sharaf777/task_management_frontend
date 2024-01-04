import React, {useState, useEffect} from 'react';
import Projectcard from '../Components/Projectcard';
import Projectcard2 from '../Components/projectcard2';
import Classcard from '../Components/Classcard';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
//import SearchManager from '../Components/SearchManger';

function Project() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        const response = await axios.get('http://localhost:5001/projects/', {
          headers: {
            Authorization: adminToken,
          },
        });
        setProjects(response.data.projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);
  
    const createButtonStyle = {
    backgroundColor: '#424cbf',
    borderRadius: '12px',
    border: '0',
    color: '#fff',
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: '18px',
    height: '50px',
    marginTop: '10px',
    marginLeft:'20px',
    textAlign: 'center',
    alignitem:'center',
    width: '90%',
  };
  createButtonStyle[':hover'] = {
    backgroundColor: '#424cbfa9',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button style={createButtonStyle} component={Link}to="/create-project">
            Create Project<AddIcon/>
          </Button>
          <Button style={createButtonStyle} component={Link}to="/Create-manager">
            Create Manager<AddIcon/>
          </Button>
          <Button style={createButtonStyle} component={Link}to="/create-project">
            Create User<AddIcon/>
          </Button>
         

        </Grid>
        <Grid item xs={9}>
          <Grid item xs={8}><Projectcard/></Grid>
          {/* <Grid container spacing={2}>

            <Grid item xs={4}><Projectcard2/></Grid>
             <Grid item xs={4}>  <Classcard/></Grid>
          </Grid> */}
          {/* {projects.map((project) => (
            <Projectcard key={project._id} projects={projects} />
          ))} */}
          {/* <SearchManager/> */}
          
         
        </Grid>
      </Grid>
    </div>
  );
}

export default Project