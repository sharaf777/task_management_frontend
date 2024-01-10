import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/Projectlist.css'; // Make sure to update the import path
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from 'axios';

const ClassList = ({ projectId, classId }) => {
  const [className, setClassName] = useState('');
  const [members, setMembers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchClassDetails = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        console.log('authToken:', authToken);
        console.log('projectId:', projectId);
        console.log('classId:', classId);

        if (projectId && classId) {
          const response = await axios.get(`http://localhost:5001/class/${projectId}/${classId}`, {
            headers: {
              Authorization: authToken,
            },
          });
          console.log('class detal Data:', response.data.selectedClass);
          setClassName(response.data.selectedClass);
        } else {
          console.log('Project ID or Class ID is null or undefined. Skipping API call.');
        }
      } catch (error) {
        console.error('Error fetching class details:', error);
      }
    };

    const fetchMembers = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        console.log('authToken:', authToken);
        console.log('projectId:', projectId);
        console.log('classId:', classId);

        if (projectId && classId) {
          const response = await axios.get(`http://localhost:5001/class/${projectId}/${classId}/getUsers`, {
            headers: {
              Authorization: authToken,
            },
          });

          setMembers(response.data.users);
        } else {
          console.log('Project ID or Class ID is null or undefined. Skipping API call.');
        }
      } catch (error) {
        console.error('Error fetching members:', error);
      }
    };

    fetchClassDetails();
    fetchMembers();
  }, [projectId, classId]); // Include projectId and classId in the dependency array

  const handleRemoveMember = async (memberId) => {
    try {
      const adminToken = localStorage.getItem('authToken');
      console.log('Admin Token:', adminToken);
      console.log('Before axios.delete');

      const response = await axios.delete(
        `http://localhost:5001/class/${projectId}/${classId}/delete`,
        {
          headers: {
            Authorization: adminToken,
          },
          data: {
            deletedUsers: [memberId],
          },
        }
      );

      console.log('After axios.delete');
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
    <div className='body-list'>
      <section className="app-list">
        <aside className="sidebar">
          <header>
             <div>{className.name}</div>
          </header>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <div className="sidebar-navItem">Members</div>
                <ul className="nav-flyout">
                  {members && members.length > 0 ? (
                    members.map((member) => (
                      <li key={member._id}>
                        <a href="#">
                          <div className="sidebar-navName">{member.username}</div>
                          <div className="sidebar-navIcon" onClick={() => handleRemoveMember(member._id)}>
                            <PersonRemoveIcon />
                          </div>
                        </a>
                        {console.log('mebername',member.username)}
                      </li>
                    ))
                  ) : (
                    <li className="sidebar-navName">No members found.</li>
                  )}
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
      </section>
    </div>
  );
};

export default ClassList;
