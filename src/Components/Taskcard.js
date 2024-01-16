import React, { useState, useEffect } from 'react';
import '../Styles/Classcard.css';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Link } from 'react-router-dom';

function Taskcard({ projectId, classId }) {
  const [tasks, setTasks] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log('projectID',projectId);
        console.log('classId',classId);
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:5001/class/${projectId}/${classId}/getTasks`, {
          headers: {
            Authorization: authToken,
          },
        });
        setTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching task details:', error);
      }
    };

    const fetchUserRole = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5001/auth/role', {
          headers: {
            Authorization: authToken,
          },
        });

        if (response.data && response.data.role) {
          setUserRole(response.data.role);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchTasks();
    fetchUserRole();
  }, [projectId]);

   const deleteTask = async (taskId) => {
    try {
      const authToken = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5001/class/${projectId}/${classId}/${taskId}/delete`, {
        headers: {
          Authorization: authToken,
        },
      });

      // Update the state after deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  

  return (
    <div className="card-container">
      <div className="card-columns">
        {tasks.map((task) => (
          <div className="card" key={task._id}>
            <div className="position-relative"></div>
            <div className="card-body">
              <div className="del-icon" onClick={() => deleteTask(task._id)}>
                <DeleteIcon />
              </div>
              <h5 className="card-title">{task.title}</h5>
              <h5 className="card-text">{task.description}</h5>
              <h5 className="card-text1">Due Date: {task.dueDate}</h5>
              <hr />
            </div>
            <div className="card-footer">
              <div className="footerleft">{task.status}</div>
              <div className="footerright">
                <div>
                  <Link  to={{pathname: '/update-task',
                              search: `?projectId=${projectId}&classId=${classId}&taskId=${task._id}`,
                            }}>
                    <SettingsSuggestIcon  onClick={() => console.log('tasktoedit taskId:', task._id)}/>
                  </Link>
                </div>
                <div>
                  <Link  to={{pathname: '/AddTask-user',
                              search: `?projectId=${projectId}&classId=${classId}&taskId=${task._id}`,
                            }}>
                    <PersonAddIcon />
                  </Link>
                </div>
                <div>
                  <Link to={{ pathname: '/taskviewer',
                              search: `?projectId=${projectId}&classId=${classId}&taskId=${task._id}`,
                            }}>
                    <ArrowRightAltIcon onClick={() => console.log('taskcardtoview taskId:', task._id)}/>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Taskcard;
