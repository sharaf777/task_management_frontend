import React, {useEffect}from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, Button } from '@mui/material';
import Classlist from '../Components/Classlist';
import AddIcon from '@mui/icons-material/Add';
import Taskcardviewer from '../Components/Taskcardviewer';
//import { useEffect } from 'react';

const Taskviewer = (props) =>  {
  const location = useLocation();
  const projectId = new URLSearchParams(location.search).get('projectId');
  const classId = new URLSearchParams(location.search).get('classId');
   const taskId = new URLSearchParams(location.search).get('taskId');

    
   useEffect(() => {
  console.log('project id in class', projectId);
   console.log('class id in class', classId);

  
  },[]);
  return (
     <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        
        <Grid item xs={10}>
          <Taskcardviewer projectId={projectId} classId={classId} taskId={taskId}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Taskviewer