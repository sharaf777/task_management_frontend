import React, { useState } from 'react';
import '../Styles/Projectcreate.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
//import SearchManager from '../Components/SearchManger';

function Projectcreate() {
  const [projectName, setProjectName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedManagers, setSelectedManagers] = useState([]); // State to store selected managers
  const navigate = useNavigate();

  const handleManagerSelection = (selectedManager) => {
    setSelectedManagers([...selectedManagers, selectedManager]);
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      // Your project creation logic here

      // Example: Log the selected managers
      console.log('Selected Managers:', selectedManagers);

      // Reset form fields and selected managers after project creation
      setProjectName('');
      setDescription('');
      setSelectedManagers([]);

      // Redirect or perform any other actions after project creation
    } catch (error) {
      console.error('Error during project creation:', error);
      // Handle errors as needed
    }
  };

  return (
    <div className='form-body'>
      <div className="form">
        <div className="form-title">Create project</div>
        <div className="form-subtitle">Let's create your new project!</div>
        <div className="input-container ic1">
          <input
            id="projectName"
            className="input"
            type="text"
            placeholder=" "
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <div className="cut">Name</div>
          <label htmlFor="projectName" className="placeholder">
            Project name
          </label>
        </div>
        <div className="input-container ic2">
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
            Add small description
          </label>
        </div>
        <div className="input-container ic2">
          {/* Use the SearchManager component for manager search */}
           <input
            id="description"
            className="input"
            type="text"
            placeholder=" "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="cut">Manager</div>
          <label className="placeholder">Add manager</label>
        </div>
        {/* <SearchManager handleManagerSelection={handleManagerSelection} /> */}
        <div className="selected-managers">
          <h2>Selected Managers</h2>
          {selectedManagers.map((manager) => (
            <p key={manager._id}>{manager.username}</p>
          ))}
        </div>
        <button type="submit" className="submit" onClick={handleCreateProject}>
          Create
        </button>
      </div>
    </div>
  );
}

export default Projectcreate;
