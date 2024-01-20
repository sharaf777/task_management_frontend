import React, {useEffect}from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Grid } from '@mui/material';
import Classlist from '../Components/Classlist';
import AddIcon from '@mui/icons-material/Add';
import ReplyIcon from '@mui/icons-material/Reply';
import Taskcard from '../Components/Taskcard';
import '../Styles/Navbutton.css';


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
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <button className='navButton' >
            <Link className='link' to={`/class?projectId=${projectId}`}> Back to class</Link>  <ReplyIcon/>
          </button> 
          <button className='navButton' >
            <Link className='link' to={`/Create-task?projectId=${projectId}&classId=${classId}`}> Create New task</Link>  <AddIcon/>
          </button>
          <Classlist projectId={projectId} classId={classId}/>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={9} xl={10}>
          <Taskcard projectId={projectId} classId={classId}/>
        </Grid>
      </Grid>
    </div>
  )
}

export default Task