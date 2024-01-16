import React, { useState, useEffect } from 'react';
import '../Styles/Projectcard.css';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast} from 'react-toastify';
import axios from 'axios';

function Projectcard({ projectId }) {
  const [project, setProject] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
        console.log('authToken:', authToken);
        const response = await axios.get(`http://localhost:5001/projects/`, {
          headers: {
            Authorization: authToken,
          },
        });
        // console.log('res', response.data);
        setProject(response.data.projects);
        

        // Make an additional API call to get the user role from the backend
        const userRoleResponse = await axios.get('http://localhost:5001/auth/role', {
          headers: {
            Authorization: authToken,
          },
        });

        if (userRoleResponse.data && userRoleResponse.data.role) {
          setUserRole(userRoleResponse.data.role);
        }
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);
    

 const deleteProject = async (projectId) => {
    try {
      if (userRole !== 'admin') {
       
        toast.warning("Only admin can remove the project.",{
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

      // If the user clicks "Cancel", do nothing
      if (!isConfirmed) {
        return;
      }

      const adminToken = localStorage.getItem('authToken');
      await axios.delete(`http://localhost:5001/projects/${projectId}/delete`, {
        headers: {
          Authorization: adminToken,
        },
      });

      toast.success("Project removed",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      // Update the state after deletion
      setProject((prevProjects) => prevProjects.filter((project) => project._id !== projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
       toast.error("Error occured in deleting class",{
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

  if (!project || project.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {project.map((currentProject) => (
        <div key={currentProject._id} className="Procard-container">
   
        <div className="Procard-columns">
          <div className="Procard border-0">
            <div className="position-relative"></div>
            <div className="Procard-body">
              <div className="del-icon" onClick={() => deleteProject(currentProject._id)}>
                <DeleteIcon />
              </div>
              <h5 className="Procard-title">{currentProject.name}</h5>
              <hr />
              <p className="Procard-text">{currentProject.description}</p>
              <p className="Procard-text">Created by: {currentProject.admin.username}</p>
            </div>
            <div className="Procard-footer">
              <div className="Procard-footerleft">
                <div class="Procard-progress">
                  <div class="Procard-progress-value"></div>
                </div>
              </div>
              <div className="Procard-footerright">
                <div>
                  <Link to={`/Update-project?projectId=${currentProject._id}`}>
                    <SettingsSuggestIcon />
                  </Link>
                </div>
                <div>
                 <Link to={`/Add-manager?projectId=${currentProject._id}&projectName=${encodeURIComponent(currentProject.name)}`}>
                    <PersonAddIcon />
                  </Link>
                </div>
                {/* <div>
                  <Link to="/Add-manager">
                    <PersonRemoveIcon />
                  </Link>
                </div> */}
                <div>
                  <Link to={{ pathname: `/class`, search: `projectId=${currentProject._id}`,}}>
                    <ArrowRightAltIcon />
                  </Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    
    ))}
    </div>
  );
}

export default Projectcard;
