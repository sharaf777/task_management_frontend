import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Projectcreate.css';
import axios from 'axios';

function Projectupdate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate= useNavigate();
  const location = useLocation();

  // Extract projectId from the URL query parameters
  const projectId = new URLSearchParams(location.search).get('projectId');

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const adminToken = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:5001/projects/${projectId}`, {
          headers: {
            Authorization: adminToken,
          },
        });

         console.log('API Response:', response.data.project.name);
        // Set the initial state with existing project data
        setName(response.data.project.name);
        setDescription(response.data.project.description);
      } catch (error) {
        console.error('Error fetching project data:', error);
      }
    };

    fetchProjectData();
  }, [projectId]);

 const handleUpdate = async () => {
  try {
    const adminToken = localStorage.getItem('authToken');
    const updateData = {};

    if (name !== '') {
      updateData.name = name;
    }

    if (description !== '') {
      updateData.description = description;
    }

    if (Object.keys(updateData).length === 0) {
      // No fields to update, you may want to handle this case
      console.log('No fields to update');
      return;
    }

    await axios.post(
      `http://localhost:5001/projects/${projectId}/editProject`,
      updateData,
      {
        headers: {
          Authorization: adminToken,
        },
      }
    );

    // Handle success, e.g., show a success message or redirect to another page
    console.log('Project updated successfully');
    alert('Project updated successfully');
    navigate('/');
  } catch (error) {
    console.error('Error updating project:', error);
    // Handle error, e.g., show an error message to the user
  }
};


  return (
    <div className='form-body'>
      <div className="form">
        <div className="form-title">Update project</div>
        <div className="form-subtitle">Update your project!</div>
        <div className="input-container ic1">
          <input
            id="projectName"
            className="input"
            type="text"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="cut">Update Name</div>
          <label htmlFor="projectName" className="placeholder">
            Project name
          </label>
        </div>
        <div className="input-container ic2">
          <input
            id="projectDescription"
            className="input"
            type="text"
            placeholder=" "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="cut">Update Description</div>
          <label htmlFor="projectDescription" className="placeholder">
            Add a small description
          </label>
        </div>
        <button type="button" className="submit" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default Projectupdate;
