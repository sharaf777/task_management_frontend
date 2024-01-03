import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import Classlist from '../Components/Classlist';
import AddIcon from '@mui/icons-material/Add';
import Taskcard from '../Components/Taskcard';

function Task() {
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
    margingBottom:'10px',
    marginLeft:'0px',
    textAlign: 'center',
    alignitem:'center',
    width: '75%',
  };
  createButtonStyle[':hover'] = {
    backgroundColor: '#424cbfa9',
  };
  return (
     <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button
            style={createButtonStyle}
          >
             Create New task <AddIcon/>
          </Button> 
          <Classlist/>
        </Grid>
        <Grid item xs={9}>
          <Taskcard/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Task