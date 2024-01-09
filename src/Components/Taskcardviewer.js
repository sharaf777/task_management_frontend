import React, { useState, useEffect } from 'react';
import '../Styles/Classcard.css';
import axios from 'axios';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';

function Taskcard({ projectId, classId, taskId }) {
  const [members, setMembers] = useState([]);

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

    fetchTaskUsers();
  }, [projectId, classId, taskId]);

  const handleRemoveMember = async (memberId) => {
  try {
    const adminToken = localStorage.getItem('authToken');

    const response = await axios.delete(
      `http://localhost:5001/class/${projectId}/${classId}/${taskId}/deleteUsers`,
      {
        headers: {
          Authorization: adminToken,
        },
        data: {
          usersToDelete: [memberId],
        },
      }
    );

    console.log('Server Response:', response);

    // Manually filter out the removed member from the state
    setMembers((prevMembers) =>
      prevMembers.filter((member) => member._id !== memberId)
    );
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
                <div className="del-icon" onClick={() => handleRemoveMember(member._id)}>
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
