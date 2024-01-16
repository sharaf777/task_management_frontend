import React, {useEffect}from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import Classlist from '../Components/Classlist';
import AddIcon from '@mui/icons-material/Add';
import ReplyIcon from '@mui/icons-material/Reply';
import Taskcard from '../Components/Taskcard';
//import { useEffect } from 'react';

const Task = (props) =>  {
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get('projectId');
  const classId = new URLSearchParams(location.search).get('classId');

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
    margingBottom:'30px',
    marginLeft:'0px',
    textAlign: 'center',
    alignitem:'center',
    width: '75%',
  };
  createButtonStyle[':hover'] = {
    backgroundColor: '#424cbfa9',
  };
   useEffect(() => {
  console.log('project id in class', projectId);
   console.log('class id in class', classId);

  
  },[]);
  return (
     <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Button  style={createButtonStyle}  component={Link}  to={`/class?projectId=${projectId}`}>
            Back to class <ReplyIcon />
          </Button>
          <Button style={createButtonStyle} component={Link}  to={`/Create-task?projectId=${projectId}&classId=${classId}`}  onClick={() => console.log('Clicked - projectId:', projectId, 'classId:', classId)}>
             Create New task <AddIcon/>
          </Button> 
          <Classlist projectId={projectId} classId={classId}/>
        </Grid>
        <Grid item xs={9}>
          <Taskcard projectId={projectId} classId={classId}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Task