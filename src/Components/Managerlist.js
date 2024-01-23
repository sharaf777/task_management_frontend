import React, { useState, useEffect } from 'react';
import '../Styles/Managerlist.css';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from 'axios';

function Managerlist() {
  const [projectManagers, setProjectManagers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectManagers = async () => {
      try {
        const userType = localStorage.getItem('userType');

        // Check if userType is not null or undefined before using it
        if (!userType) {
          console.error('User type not found in localStorage.');
          setLoading(false);
          return;
        }

        // const authToken = localStorage.getItem(`${userType}Token`);
        // console.log(`${userType} authToken:`, authToken);

        const authToken = localStorage.getItem('authToken');
        console.log('authToken:', authToken);

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/getprojectManager`, {
          headers: {
            Authorization: authToken,
          },
        });

        console.log('response', response);
        console.log('responsedata', response.data);
        setProjectManagers(response.data);
      } catch (error) {
        console.error('Error fetching project managers:', error);
        setProjectManagers([]);
      } finally {
        setLoading(false);  // Set loading to false, regardless of success or failure.
      }
    };

    fetchProjectManagers();
  }, []);

  return (
    <div className='leaderboard_container'>
      <article className="leaderboard">
        <header>
          <h1 className="leaderboard__title">
            <span className="leaderboard__title--top">Project</span>
            <span className="leaderboard__title--bottom">Managers</span>
          </h1>
        </header>

        <main className="leaderboard__profiles">
          {loading ? (
            <p>Loading...</p>
          ) : (
            projectManagers && projectManagers.length > 0 ? (
              projectManagers.map((manager) => (
                <article key={manager._id} className="leaderboard__profile">
                  <div className="">
                    <AccountCircleIcon />
                  </div>
                  <span className="leaderboard__name">{manager.username}</span>
                </article>
              ))
            ) : (
              <p>No project managers available.</p>
            )
          )}
        </main>
      </article>
    </div>
  );
}

export default Managerlist;
