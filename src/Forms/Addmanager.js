import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Projectcreate.css';
import axios from 'axios';
import SearchManager from '../Components/SearchManger';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddManager() {
  const [projectName, setProjectName] = useState('');
  const [selectedManagers, setSelectedManagers] = useState([]);
  const location = useLocation('');
  const navigate = useNavigate();

  useEffect(() => {
    const projectNameParam = new URLSearchParams(location.search).get('projectName');
    setProjectName(projectNameParam);
  }, [location.search]);

  const handleAddManagerProject = async (selectedManager) => {
    try {
      const projectId = new URLSearchParams(location.search).get('projectId');
      const adminToken = localStorage.getItem('authToken');

      console.log('Request Payload:', {
  projectManagerNames: [selectedManager.username],
});

      if (selectedManager) {
        await axios.post(
          `http://localhost:5001/projects/${projectId}/addProjectManager`,
          { projectManagerNames: [selectedManager.username] },
          {
            headers: {
              Authorization: adminToken,
            },
          }
        );

        // Handle success, e.g., show a success message or redirect to another page
        console.log('Project manager added successfully');
        toast.success("Project manager added successfully",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

        navigate('/');
      } else {
        console.error('No manager selected');
        toast.warning("No manager selected",{
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      }
    } catch (error) {
      console.error('Error adding project manager:', error);
      // Handle error, e.g., show an error message to the user
      toast.error("Error occured in adding manager",{
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

  const handleManagerSelection = (selectedManager) => {
    setSelectedManagers([...selectedManagers, selectedManager]);
  };
  return (
    <div className='form-body'>
      <div className="form">
        <div className="form-title">Add Manager</div>
        <div className="form-subtitle">Add manager to {projectName}</div>

        <div className="input-container ic2">
          <input
            id="projectName"
            className="input"
            type="text"
            placeholder=" "
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
          <div className="cut ">Project name</div>
          <label htmlFor="projectName" className="placeholder">
            Add project name
          </label>
        </div>

         <SearchManager handleManagerSelection={handleManagerSelection} />

        <button type="button" className="submit" onClick={() => selectedManagers.length > 0 && handleAddManagerProject(selectedManagers[0])}>
          Add
        </button>
      </div>
    </div>
  );
}

export default AddManager;
