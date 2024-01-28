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
        const adminToken = localStorage.getItem('adminToken');
        console.log('admintoken',adminToken)
        const url = 'http://localhost:5001/auth/getprojectManager'; 

        const response = await axios.get(url, {
          headers: {
            Authorization: adminToken,
          },
        });
        console.log('response', response);
        console.log('responsedata', response.data);
        setProjectManagers(response.data);
        console.log('Project Managers:', projectManagers);
      } catch (error) {
        console.error('Error fetching project managers:', error);
         setProjectManagers([]);
      }finally {
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
  // Mapping through project managers and rendering each
  projectManagers.map((manager) => (
    <article key={manager._id} className="leaderboard__profile">
      <div className="">
        <AccountCircleIcon />
      </div>
      <span className="leaderboard__name">{manager.username}</span>
    </article>
  ))
) : (
  // If no project managers available
  <p>No project managers available! projectManagers.length</p>
)

)}




        </main>
      </article>
    </div>
  );
}

export default Managerlist;
