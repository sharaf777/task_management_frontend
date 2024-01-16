import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Projectcreate.css';
import axios from 'axios';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Classupdate() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Extract projectId and classId from the URL query parameters
  const projectId = new URLSearchParams(location.search).get('projectId');
  const classId = new URLSearchParams(location.search).get('classId');

  console.log('projectID',projectId);
  console.log('clasID',classId);

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        const response = await axios.post(`http://localhost:5001/class/${projectId}/${classId}/editClass`, {
          headers: {
            Authorization: authToken,
          },
        });

        console.log('API Response:', response.data.class.name);
        // Set the initial state with existing class data
        setName(response.data.class.name);
        setDescription(response.data.class.description);
      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    fetchClassData();
  }, [projectId, classId]);

  const handleUpdate = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
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
        `http://localhost:5001/class/${projectId}/${classId}/editClass`,
        updateData,
        {
          headers: {
            Authorization: authToken,
          },
        }
      );

      // Handle success, e.g., show a success message or redirect to another page
      console.log('Class updated successfully');
      toast.success("Class updated successfully",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        }); 
      navigate(`/class?projectId=${projectId}`);
    } catch (error) {
      console.error('Error updating class:', error);
      // Handle error, e.g., show an error message to the user
      toast.error("Error occured in updating class",{
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
        <div className="form-title">Update class</div>
        <div className="form-subtitle">Update your class!</div>
        <div className="input-container ic1">
          <input
            id="className"
            className="input"
            type="text"
            placeholder=" "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="cut">Update Name</div>
          <label htmlFor="className" className="placeholder">
            Class name
          </label>
        </div>
        <button type="button" className="submit" onClick={handleUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}

export default Classupdate;
