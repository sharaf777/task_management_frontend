import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../Styles/Projectcreate.css';
import axios from 'axios';
import SearchUser from '../Components/Searchuser';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddUserToClass() {
  const [className, setClassName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const location = useLocation('');
  const navigate = useNavigate();

  useEffect(() => {
    const classNameParam = new URLSearchParams(location.search).get('className') || '';
    setClassName(classNameParam);
    const projectId = new URLSearchParams(location.search).get('projectId');
      const classId = new URLSearchParams(location.search).get('classId');
      const adminToken = localStorage.getItem('authToken');
      console.log('projectID', projectId);
      console.log('classID', classId);
      console.log('Selected Users:', selectedUsers);

  }, [location.search]);

const handleAddUsersToClass = async (selectedUser) => {
  console.log('handleAddUsersToClass called');
  try {
    const projectId = new URLSearchParams(location.search).get('projectId');
    const classId = new URLSearchParams(location.search).get('classId');
    const adminToken = localStorage.getItem('authToken');
    console.log('projectID', projectId);
    console.log('classID', classId);
    console.log('Request Payload:', {
      addedUsers: [selectedUser.username],
    });

    if (selectedUser) {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/class/${projectId}/${classId}/addUsers`,
        { addedUsers: [selectedUser.username] },
        {
          headers: {
            Authorization: adminToken,
          },
        }
      );

      // Log the response from the server
      console.log('Response from server:', response.data);

      // Handle success, e.g., show a success message or redirect to another page
      console.log('Users added to class successfully');
      
      toast.success("Users added to class",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });

      navigate(`/dashboard/class?projectId=${projectId}`);

    } else {
      console.error('No user selected');
    }
  } catch (error) {
    console.error('Error adding users to class:', error);
    toast.error("Error occured in adding users to class",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
    // Handle error, e.g., show an error message to the user
  }
};


  const handleUserSelection = (selectedUser) => {
    setSelectedUsers([...selectedUsers, selectedUser]);
    console.log('Selected Users:', selectedUsers);

  };

  return (
    <div className='form-body'>
      <div className="form">
        <div className="form-title">Add User to Class</div>
        <div className="form-subtitle">Add user to {className}</div>

        {/* Input for project name (you can remove this if not needed) */}
        <div className="input-container ic2">
          <input
            id="className"
            className="input"
            type="text"
            placeholder=" "
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <div className="cut ">Class name</div>
          <label htmlFor="className" className="placeholder">
            Add class name
          </label>
        </div>

        {/* SearchUser component to select users */}
        
      <SearchUser handleUserSelection={handleUserSelection} />

        {/* Button to add selected users to the class */}
       <button
          type="button"
          className="submit"
          onClick={async () => {
  try {
    console.log('Button clicked');
    if (selectedUsers.length > 0) {
      await handleAddUsersToClass(selectedUsers[0]);
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

export default AddUserToClass;
