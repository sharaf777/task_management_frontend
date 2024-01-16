import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import Projectlist from '../Components/Projectlist';
import AddIcon from '@mui/icons-material/Add';
import ReplyIcon from '@mui/icons-material/Reply';
import Classcard from '../Components/Classcard';

const Class = (props) => {
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get('projectId');

  const createButtonStyle = {
    backgroundColor: '#424cbf',
    borderRadius: '12px',
    border: '0',
    color: '#fff',
    boxSizing: 'border-box',
    cursor: 'pointer',
    fontSize: '18px',
    height: '50px',
    marginTop: '0px',
    marginBottom: '20px',
    marginLeft: '0px',
    textAlign: 'center',
    alignItems: 'center',
    width: '75%',
  };
  createButtonStyle[':hover'] = {
    backgroundColor: '#424cbfa9',
  };

  useEffect(() => {
  console.log('project id in class', projectId);

  if (!location.state || !location.state.projectId) {
    //console.error('Project ID is missing in location state.');
    // Handle this case as needed, such as redirecting the user or showing an error message.
    return;
  }

  // Use location.state.projectId as needed.
}, [projectId, location.state]);


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button  style={createButtonStyle}  component={Link}  to={`/`}>
            Back to project <ReplyIcon />
          </Button>
          <Button  style={createButtonStyle}  component={Link}  to={`/Create-class?projectId=${projectId}`}>
            Create New class <AddIcon />
          </Button>

          <Button style={createButtonStyle} component={Link} to="/Create-user">
            Create User<AddIcon />
          </Button>
          <Projectlist projectId={projectId} />
        </Grid>
        <Grid item xs={9}>
          <Classcard projectId={projectId}/>
        </Grid>
      </Grid>
    </div>
  );
}

export default Class;
