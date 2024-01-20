import React, { useState, useEffect } from 'react';
import '../Styles/Classcard.css';
import axios from 'axios';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Taskcard({ projectId, classId, taskId }) {
  const [members, setMembers] = useState([]);
  const [userRole, setUserRole] = useState('');
  

  useEffect(() => {
    const fetchTaskUsers = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
       
        if (projectId && classId && taskId) {
          const response = await axios.get(`http://localhost:5001/class/${projectId}/${classId}/${taskId}/getUsers`, {
            headers: {
              Authorization: authToken,
            },
          });

          console.log('Response:', response);
          console.log('Response Data:', response.data.usersInTask);

          setMembers(response.data.usersInTask);
          
        } else {
          console.log('Project ID, Class ID, or Task ID is null or undefined. Skipping API call.');
        }
      } catch (error) {
        console.error('Error fetching task users:', error);
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

    fetchTaskUsers();
    fetchUserRole();
  }, [projectId, classId, taskId]);

  const handleRemoveMember = async (username) => {
  try {
     if (userRole !== 'projectManager') {
        toast.warning("Only  Manger can remove user.",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        })
        return;
      }

      const isConfirmed = window.confirm('Are you sure you want to delete this class?');

      // If the user clicks "Cancel", do nothing
      if (!isConfirmed) {
        return;
      }

    const adminToken = localStorage.getItem('authToken');
     console.log('Members before API call:', members);
    const response = await axios.delete(
      `http://localhost:5001/class/${projectId}/${classId}/${taskId}/deleteUsers`,
      {
        headers: {
          Authorization: adminToken,
        },
        data: {
          usersToDelete: [username],
        },
      }
    );
      
    console.log('Server Response:', response);
    console.log('Server Response data:', response.data);

    // Use the functional form of setMembers to update based on the previous state
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member.username !== username)
    );
    console.log('Members after API call:', members);
  } catch (error) {
    console.error('Error removing member:', error);
    // Handle error, e.g., show an error message to the user
  }
};



  return (
    <div className="card-container">
      <div className="card-columns">
        {members.map((member) => (
        <div className="card" key={member.userId}>
          <div className="position-relative"></div>
          <div className="card-body">
               <div >
                <h5 className="card-title">User in task: {member.username}</h5>
                <div className="del-icon" onClick={() => handleRemoveMember(member.username)}>
                  <PersonRemoveIcon />
                </div>
              </div>
            <hr />
          </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Taskcard;
