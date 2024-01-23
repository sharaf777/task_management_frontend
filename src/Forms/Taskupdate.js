import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Projectcreate.css';
import axios from 'axios';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Taskupdate() {
  const [name, setName] = useState('');
  const [taskName, setTaskName] = useState('');
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [status, setStatus] = useState('todo'); // Default status is 'todo'
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState(null);
   const [taskData, setTaskData] = useState({name: '',description: '', dueDate: null,status: 'todo',});

  // Extract projectId and classId from the URL query parameters
  const projectId = new URLSearchParams(location.search).get('projectId');
  const classId = new URLSearchParams(location.search).get('classId');
  const taskId = new URLSearchParams(location.search).get('taskId');

  console.log('projectID', projectId);
  console.log('classID', classId);
  console.log('taskID', taskId);

   useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/class/${projectId}/${classId}/${taskId}`, {
          headers: {
            Authorization: authToken,
          },
        });

        const fetchedTaskData = response.data.task;

        // Set the initial state with existing task data
        setTaskData({
          title: fetchedTaskData.title || '',
          description: fetchedTaskData.description || '',
          dueDate: fetchedTaskData.dueDate || null,
          status: fetchedTaskData.status || 'todo',
        });
      } catch (error) {
        console.error('Error fetching task data:', error);
      }
    };

    fetchTaskData();
  }, [taskId]);

  const handleUpdate = async () => {
  try {
    const authToken = localStorage.getItem('authToken');
    const updateData = {};

    if (taskData.title !== '') {
      updateData.title = taskData.title;
    }

    if (taskData.description !== '') {
      updateData.description = taskData.description;
    }

    if (taskData.dueDate !== null) {
      updateData.dueDate = taskData.dueDate;
    }

    if (taskData.status !== '') {
      updateData.status = taskData.status;
    }

    console.log('Task Title:', taskData.title);
    console.log('Description:', taskData.description);
    console.log('Due Date:', taskData.dueDate);
    console.log('Status:', taskData.status);

    if (Object.keys(updateData).length === 0) {
      console.log('No fields to update');
      return;
    }

    console.log('Request Payload:', { updatedDetails: updateData });

    await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/class/${projectId}/${classId}/${taskId}/editTask`,
      { updatedDetails: updateData }, // Wrap the data in 'updatedDetails'
      {
        headers: {
          Authorization: authToken,
        },
      }
    );

    console.log('Task updated successfully');
    toast.success("Task updated successfully",{
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
  } catch (error) {
    console.error('Error updating task:', error);
    toast.error("Error occured in updating task",{
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


  return (
    <div className='form-body'>
      <div className="form">
        <div className="form-title">Update task</div>
        <div className="form-subtitle">Update your task!</div>
        <div className="input-container ic1">
          <input
            id="taskName"
            className="input"
            type="text"
            placeholder=" "
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            required
          />
          <div className="cut">Name</div>
          <label htmlFor="taskName" className="placeholder">
            Task name
          </label>
        </div>

        <div className="input-container ic1">
          <input
            id="description"
            className="input"
            type="text"
            placeholder=" "
            value={taskData.description}
            onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
            required
          />
          <div className="cut">Description</div>
          <label htmlFor="description" className="placeholder">
            Description
          </label>
        </div>

        {/* Use the date input */}
        <div className="input-container ic1 datepicker-container">
          <input
            id="date"
            className="input"
            type="date"
            placeholder=" "
            value={taskData.dueDate || ''}
            onChange={(e) => setTaskData({ ...taskData, dueDate: e.target.value })}
            required
          />
          <div className="cut">Date</div>
          <label htmlFor="date" className="placeholder">
            Date
          </label>
        </div>

        <div className="input-container ic1">
          <select
            id="status"
            className="input"
            value={taskData.status}
            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
            required
          >
            <option value="todo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div className="cut">Status</div>
          <label htmlFor="status" className="placeholder">
            Status
          </label>
        </div>

        <button type="button" className="submit" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default Taskupdate;
