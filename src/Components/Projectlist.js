import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/Projectlist.css';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from 'axios';

const Projectlist = ({ projectId }) => {
  const [projectManagers, setProjectManagers] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProjectManagers = async () => {
      try {
      const authToken = localStorage.getItem('authToken');
      console.log('authToken:', authToken);

        if (projectId) {
          const response = await axios.get(`http://localhost:5001/projects/${projectId}/getAllManagers`, {
            headers: {
              Authorization: authToken,
            },
          });

          setProjectManagers(response.data.projectManagers);
        } else {
          console.log('Project ID is null or undefined. Skipping API call.');
        }
      } catch (error) {
        console.error('Error fetching project managers:', error);
      }
    };

    fetchProjectManagers();
  }, [projectId]); // Include projectId in the dependency array to fetch managers when projectId changes

const handleRemoveManager = async (managerId) => {
  try {
    const adminToken = localStorage.getItem('authToken');
    console.log('Admin Token:', adminToken);

    console.log('Before axios.delete');

    await axios.delete(
      `http://localhost:5001/projects/${projectId}/removeProjectManager`,
      {
        headers: {
          Authorization: adminToken,
        },
        data: {
          projectManagerNames: [managerId],
        },
      }
    );

    console.log('After axios.delete');

    // Manually filter out the removed manager from the state
    setProjectManagers((prevManagers) =>
      prevManagers.filter((manager) => manager._id !== managerId)
    );
  } catch (error) {
    console.error('Error removing project manager:', error);
    // Handle error, e.g., show an error message to the user
  }
};



  return (
    <div className='body-list'>
      <section className="app-list">
        <aside className="sidebar">
          <header>
            Project Name
          </header>
          <nav className="sidebar-nav">
            <ul>
              <li>
                <div className="sidebar-navItem">Project Managers</div>
                <ul className="nav-flyout">
                  {projectManagers.map((manager) => (
                    <li key={manager._id}>
                      <a href="#">
                        <div className="sidebar-navName">{manager.username} </div>
                        <div className="sidebar-navIcon" onClick={() => handleRemoveManager(manager._id)}>
                          <PersonRemoveIcon />
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </aside>
      </section>
    </div>
  );
};

export default Projectlist;
