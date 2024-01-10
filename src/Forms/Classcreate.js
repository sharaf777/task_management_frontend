import React, { useState, useEffect } from 'react';
import '../Styles/Projectcreate.css';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Classcreate = () => {
  const [projectName, setProjectName] = useState('');
  const [className, setClassName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedManagers, setSelectedManagers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  //const projectId = location.state?.projectId;

const projectId = new URLSearchParams(location.search).get('projectId');


  useEffect(() => {
    console.log('Project ID from location state:', projectId); // Log projectId to check its value
    if (!projectId) {
      console.error('Project ID is undefined in location state.'); // Log an error if projectId is undefined
      // You might want to handle this error case, such as redirecting the user or showing an error message
      return;
    }

    const fetchProjectDetails = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const config = {
          headers: {
            Authorization: authToken,
          },
        };

        const response = await axios.get(`http://localhost:5001/projects/${projectId}`, config);
        setProjectName(response.data.project.name);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  const handleManagerSelection = (selectedManager) => {
    setSelectedManagers([...selectedManagers, selectedManager]);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      // Prepare data to be sent to the backend
      const requestData = {
        name: className, // Use the class name input
        description: description,
        projectManagers: selectedManagers.map(manager => manager.username),
      };

      // Make a request to the backend to create a new class
      const authToken = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: authToken,
        },
      };

      const response = await axios.put(`http://localhost:5001/class/${projectId}/addClass`, requestData, config);

      // Handle successful class creation
      console.log('Class created successfully:', response.data);
      toast.success("Class created successfully!",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

      // Reset form fields and selected managers after class creation
      setClassName('');
      setDescription('');
      setSelectedManagers([]);

      // Redirect or perform any other actions after class creation
      navigate('/class'); // Example: Redirect to the dashboard page
    } catch (error) {
      console.error('Error during class creation:', error);
      toast.error("Error occured in creating class",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        }); 

      // Handle errors as needed
    }
  };

  return (
    <div className='form-body'>
      <div className="form">
        <div className="form-title">Create class </div>
        <div className="form-subtitle">Create new class for {projectName} </div>
        
        {/* Use the project name as a read-only input */}
        {/* <div className="input-container ic1">
          <input
            id="projectName"
            className="input"
            type="text"
            placeholder=" "
            value={projectName}
            readOnly
            required
          />
          <div className="cut">Project Name</div>
          <label htmlFor="projectName" className="placeholder">
            Project name
          </label>
        </div> */}

        {/* Use the class name input */}
        <div className="input-container ic1">
          <input
            id="className"
            className="input"
            type="text"
            placeholder=" "
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
          />
          <div className="cut">Name</div>
          <label htmlFor="className" className="placeholder">
            Class name
          </label>
        </div>

        {/* Add other input fields as needed */}
        {/* ... */}

        <button type="submit" className="submit" onClick={handleCreateProject}>
          Create
        </button>
      </div>
    </div>
  );
}

export default Classcreate;
