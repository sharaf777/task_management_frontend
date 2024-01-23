import React, {useEffect, useState}from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid, Button } from '@mui/material';

import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ReplyIcon from '@mui/icons-material/Reply';

import axios from 'axios';
import Taskcardviewer from '../Components/Taskcardviewer';
//import { useEffect } from 'react';

const Taskviewer = (props) =>  {
  const location = useLocation();
  const [taskDetails, setTaskDetails] = useState('');
  const projectId = new URLSearchParams(location.search).get('projectId');
  const classId = new URLSearchParams(location.search).get('classId');
   const taskId = new URLSearchParams(location.search).get('taskId');

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
    marginLeft: '20px',
    textAlign: 'center',
    alignItems: 'center',
    width: '20%',
  };
    
  useEffect(() => {
  console.log('project id in class', projectId);
   console.log('class id in class', classId);

    const fetchTaskDetails = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/class/${projectId}/${classId}/${taskId}`, {
      headers: {
        Authorization: authToken,
      },
    });
    
    // Assuming response.data contains task details
    const taskDetails = response.data;
    console.log('task name:',response.data.task.title);
    // Check if the response is successful
    if (response.status === 200) {
      // Update the task name in the state
      setTaskDetails(taskDetails.task);
    } else {
      // Handle error, show a message, etc.
      console.error('Error fetching task details:', response.data.message);
    }
  } catch (error) {
    console.error('Error fetching task details:', error);
  }
};

    fetchTaskDetails();
  }, [projectId, classId, taskId]);
  return (
     <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Grid container spacing={2}>
        
        <Grid item xs={10}>
          <Button  style={createButtonStyle}  component={Link}  to={`/task?projectId=${projectId}&classId=${classId}`}>
             Back to class  <ReplyIcon/>
          </Button>
          <div style={{  fontWeight: 'bold', marginLeft:'10px', marginBottom:'10px' }}>
            <h2 style={{ fontSize: '26px', color: 'black', fontWeight: 'bold',  display:'inline' }}> TaskName :</h2> 
          <h3 style={{ fontSize: '26px', color: '#424cbf', fontWeight: 'bold',  display:'inline' ,marginLeft:'10px' }}>{taskDetails.title}</h3>
          </div>
           
          
          <Taskcardviewer projectId={projectId} classId={classId} taskId={taskId}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Taskviewer