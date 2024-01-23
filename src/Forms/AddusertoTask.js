import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchClassUser from '../Components/SearchClassUser';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUserToTask() {
  const [taskTitle, setTaskTitle] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const location = useLocation('');
  const navigate = useNavigate();
  const projectId = new URLSearchParams(location.search).get('projectId');
  const classId = new URLSearchParams(location.search).get('classId');
  const taskId = new URLSearchParams(location.search).get('taskId');

  const handleAddUsersToTask = async (selectedUser) => {
    console.log('handleAddUsersToTask called');
    try {
      const adminToken = localStorage.getItem('authToken');
      console.log('projectID', projectId);
      console.log('taskID', taskId);
      console.log('Request Payload:', {
        addedUsers: [selectedUser.username],
      });

      if (selectedUser) {
        const response = await axios.put(
          `${process.env.REACT_APP_BACKEND_URL}/class/${projectId}/${classId}/${taskId}/addUsers`,
          { assignedUsers: [selectedUser.username] },
          {
            headers: {
              Authorization: adminToken,
            },
          }
        );

        // Log the response from the server
        console.log('Response from server:', response.data);

        // Handle success, e.g., show a success message or redirect to another page
        console.log('Users added to task successfully');
        toast.success("Users added to task successfully",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

          navigate(`/task?projectId=${projectId}&classId=${classId}`);
      } else {
        console.error('No user selected');
        toast.warning("No user selected",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      }
    } catch (error) {
      console.error('Error adding users to task:', error);
      // Handle error, e.g., show an error message to the user
      toast.error("Error adding users to task",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    }
  };

  const handleClassUserSelection = (selectedUser) => {
    setSelectedUsers((prevSelectedUsers) => {
      const updatedUsers = [...prevSelectedUsers, selectedUser];
      console.log('Selected Users:', updatedUsers);
      return updatedUsers;
    });
  };

  useEffect(() => {
    const taskTitleParam = new URLSearchParams(location.search).get('taskTitle') || '';
    setTaskTitle(taskTitleParam);
    const projectId = new URLSearchParams(location.search).get('projectId');
    const taskId = new URLSearchParams(location.search).get('taskId');
    const adminToken = localStorage.getItem('authToken');
    console.log('projectID', projectId);
    console.log('taskID', taskId);
    console.log('Selected Users:', selectedUsers);
  }, [location.search, projectId, taskId]);

  return (
    <div className='form-body'>
      <div className="form">
        <div className="form-title">Add Task User</div>
        <div className="form-subtitle">Add user to {taskTitle}</div>

        {/* Input for project name (you can remove this if not needed) */}
        <div className="input-container ic2">
          <input
            id="className"
            className="input"
            type="text"
            placeholder=" "
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <div className="cut ">Task name</div>
          <label htmlFor="className" className="placeholder">
            Add task name
          </label>
        </div>

        {/* SearchUser component to select users */}
        <SearchClassUser projectId={projectId} classId={classId} handleClassUserSelection={handleClassUserSelection} />

        {/* Button to add selected users to the task */}
        <button
          type="button"
          className="submit"
          onClick={async () => {
            try {
              console.log('Button clicked');
              if (selectedUsers.length > 0) {
                await handleAddUsersToTask(selectedUsers[0]);
              }
            } catch (error) {
              console.error('Error in onClick handler:', error);
            }
          }}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddUserToTask;
