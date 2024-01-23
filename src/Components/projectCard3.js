import React, { useState, useEffect } from 'react';
import '../Styles/Projectcard.css';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import axios from 'axios';

function Projectcard3({ projectId, AdminName }) {
  const [project, setProject] = useState(null);
  const [userRole, setUserRole] = useState('');
  const [isManager, setIsManager] = useState(false);
  const isAdmin = userRole === 'admin';
  const isMember = userRole === 'member';

  const deleteProject = async (projectId) => {
    try {
      if (userRole !== 'admin') {
        toast.warning("Only admin can remove the project.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        return;
      }

      const isConfirmed = window.confirm('Are you sure you want to delete this project?');

      if (!isConfirmed) {
        return;
      }

      const adminToken = localStorage.getItem('authToken');
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/delete`, {
        headers: {
          Authorization: adminToken,
        },
      });

      toast.success("Project removed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      setProject((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      toast.error("Error occurred in deleting class", {
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

  const fetchProjectByID = async () => {
    try {
      const authToken = localStorage.getItem('authToken');
      console.log('projectid',projectId)
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}`, {
        headers: {
          Authorization: authToken,
        },
      });

      setProject(response.data.project); // Assuming the response contains a "project" field

      const userRoleResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/role`, {
        headers: {
          Authorization: authToken,
        },
      });

      if (userRoleResponse.data && userRoleResponse.data.role) {
        setUserRole(userRoleResponse.data.role);
      } 
     // Fetch all project managers
      const managersResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/projects/${projectId}/getAllManagers`, {
        headers: {
          Authorization: authToken,
        },
      });
      console.log('managerIds',managersResponse.data.projectManagers);
      console.log('managerIds',managersResponse.data.projectManagers.map(manager => manager._id));
      const managerIds = managersResponse.data.projectManagers.map(manager => manager._id) || [];
      const loggedInUserId = userRoleResponse.data._id;
      console.log('managerIds',managerIds);
      console.log('loggedInUserId',loggedInUserId);
      // Check if the logged-in user is a manager
      setIsManager(managerIds.includes(loggedInUserId));
    } catch (error) {
      console.error('Error fetching project details:', error);
    }
  };

  useEffect(() => {
    fetchProjectByID();
  }, [projectId]);

  if (!project) {
    return <p>Loading...</p>;
  }
 if (!isAdmin && !isManager && !isMember) {
    return <p>You haven't assigned for project yet.</p>;
  }
  return (
    <div className="Procard-columns">
      <div className="Procard border-0">
        <div className="position-relative"></div>
        <div className="Procard-body">
          <div className="del-icon" onClick={() => deleteProject(project._id)}>
            <DeleteIcon />
          </div>
          <h5 className="Procard-title">{project.name}</h5>
          <hr />
          <p className="Procard-text">{project.description}</p>
          <p className="Procard-text">Created by: {AdminName}</p>
        </div>
        <div className="Procard-footer">
          <div className="Procard-footerleft">
            <div className="Procard-progress">
              <div className="Procard-progress-value"></div>
            </div>
          </div>
          <div className="Procard-footerright">
            <div>
              {isAdmin ? (
                <Link to={`/Update-project?projectId=${project._id}`}>
                  <SettingsSuggestIcon />
                </Link>
              ) : (
                <Link onClick={() => toast.warning("Only admin can update project details.")}>
                  <SettingsSuggestIcon />
                </Link>
              )}
            </div>
            <div>
              {isAdmin ? (
                <Link to={`/Add-manager?projectId=${project._id}&projectName=${encodeURIComponent(project.name)}`}>
                  <PersonAddIcon />
                </Link>
              ) : (
                <Link onClick={() => toast.warning("Only admin can add project managers.")}>
                  <PersonAddIcon />
                </Link>
              )}
            </div>
            <div>
              <Link to={{ pathname: `/class`, search: `projectId=${project._id}`, }}>
                <ArrowRightAltIcon />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projectcard3;
