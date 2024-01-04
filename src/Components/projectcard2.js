import React, { useState, useEffect } from 'react';
import '../Styles/Projectcard.css';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Projectcard2({ projectId }) {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const adminToken = localStorage.getItem('adminToken');
        console.log('token', adminToken);
        const response = await axios.get(`http://localhost:5001/projects/`, {
          headers: {
            Authorization: adminToken,
          },
        });
        console.log('res', response.data);
        setProject(response.data.projects);
      } catch (error) {
        console.error('Error fetching project details:', error);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

  if (!project || project.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {project.map((currentProject) => (
        <div key={currentProject._id} className="Procard-container">
    <div className="Procard-container">
      <div className="Procard-columns">
        <div className="Procard border-0">
          <div className="position-relative"></div>
          <div className="Procard-body">
            <div className="del-icon">
              <DeleteIcon />
            </div>
            <h5 className="Procard-title">{currentProject.name}</h5>
            <hr />
            <p className="Procard-text">{currentProject.description}</p>
          </div>
          <div className="Procard-footer">
            <div className="Procard-footerleft">Status bar</div>
            <div className="Procard-footerright">
              <div>
                <Link to="/Update-project">
                  <SettingsSuggestIcon />
                </Link>
              </div>
              <div>
                <Link to="/Add-manager">
                  <PersonAddIcon />
                </Link>
              </div>
              <div>
                <Link to="/Add-manager">
                  <PersonRemoveIcon />
                </Link>
              </div>
              <div>
                <Link to="/class">
                  <ArrowRightAltIcon />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="Procard border-1">
          <div className="position-relative"></div>
          <div className="Procard-body">
            <div className="del-icon">
              <DeleteIcon />
            </div>
            <h5 className="Procard-title">{currentProject.name}</h5>
            <hr />
            <p className="Procard-text">{currentProject.description}</p>
          </div>
          <div className="Procard-footer">
            <div className="Procard-footerleft">Status bar</div>
            <div className="Procard-footerright">
              <div>
                <Link to="/Update-project">
                  <SettingsSuggestIcon />
                </Link>
              </div>
              <div>
                <Link to="/Add-manager">
                  <PersonAddIcon />
                </Link>
              </div>
              <div>
                <Link to="/Add-manager">
                  <PersonRemoveIcon />
                </Link>
              </div>
              <div>
                <Link to="/class">
                  <ArrowRightAltIcon />
                </Link>
              </div>
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

export default Projectcard2;
