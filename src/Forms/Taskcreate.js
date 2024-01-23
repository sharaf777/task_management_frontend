import React, { useState, useEffect } from 'react';
import '../Styles/Taskcreate.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import SearchClassUser from '../Components/SearchClassUser';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Taskcreate = () => {
  const [taskName, setTaskName] = useState('');
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [date, setDate] = useState(null);

  const projectId = new URLSearchParams(location.search).get('projectId');
  const classId = new URLSearchParams(location.search).get('classId');

  useEffect(() => {
    console.log('Project ID from location state:', projectId);
    console.log('class ID from location state:', classId);
    if (!projectId) {
      console.error('Project ID is undefined in location state.');
      return;
    }

    const fetchClassDetails = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: authToken,
          },
        };

        // Fetch class details using classId
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/class/${projectId}/${classId}`, config);

        // Update class name state
        setClassName(response.data.selectedClass.name);
        console.log('Fetching class details:', response.data.selectedClass.name);
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };


    fetchClassDetails();
  }, [projectId, classId]);

  

 const handleClassUserSelection = (selectedUser) => {
  setSelectedUsers((prevSelectedUsers) => {
    const updatedUsers = [...prevSelectedUsers, selectedUser];
    console.log('Selected Users:', updatedUsers);
    return updatedUsers;
  });
};

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Prepare data to be sent to the backend
    const taskDetails = {
      title: taskName,
      description: description,
      dueDate: date,
      assignedUsers: selectedUsers.map(user => user.username),
      // Add other task properties as needed
    };

    const requestData = { taskDetails };

    // Make a request to the backend to add a new task to the class
    const authToken = localStorage.getItem('authToken');
    const config = {
      headers: {
        Authorization: authToken,
      },
    };

    const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/class/${projectId}/${classId}/addTask`, requestData, config);

    // Handle successful task creation
    console.log('Task added to class successfully:', response.data);
    toast.success("Task added to class",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

    // Reset form fields after task creation
    setTaskName('');
    setDescription('');
    setSelectedUsers([]);
    setDate(null);

    // Redirect or perform any other actions after task creation
     navigate(`/task?projectId=${projectId}&classId=${classId}`); // Example: Redirect to the tasks page
  } catch (error) {
    console.error('Error during task creation:', error);
    // Handle errors as needed
     toast.error("Error occured in creating task",{
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
        <div className="form-title">Create task </div>
        <div className="form-subtitle">Create new task for {className} </div>

        {/* Use the task name input */}
        <div className="input-container ic1">
            <input
              id="taskName"
              className="input"
              type="text"
              placeholder=" "
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              value={date}
              onChange={(e) => setDate(new Date(e.target.value).toLocaleDateString('en-CA'))}
              required
            />
            <div className="cut">Date</div>
            <label htmlFor="date" className="placeholder">
              Date
            </label>
          </div>

    <SearchClassUser projectId={projectId} classId={classId} handleClassUserSelection={handleClassUserSelection} />

    <button type="submit" className="submit" onClick={handleSubmit}>
      Create
    </button>

          </div>
    </div>
  );
};

export default Taskcreate;
