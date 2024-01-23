import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import '../Styles/Projectcreate.css';

const SearchManager = (props) => {
  const [search, setSearch] = useState('');
  const [managerData, setManagerData] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [error, setError] = useState('');
  const [isResultsVisible, setResultsVisible] = useState(false);

  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleManagerClick = async (selectedManager) => {
  // Store the selected manager's details
  const { _id, username } = selectedManager;

  try {
    const adminToken = localStorage.getItem('authToken');
    const adminNameResponse = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/auth/adminname`, {
      headers: {
        Authorization: adminToken,
      },
    });

    const { username: added_by_admin } = adminNameResponse.data;

    setSelectedManagers(prevSelectedManagers => [
      ...prevSelectedManagers,
      { _id, username, added_by_admin }
    ]);

    // Remove selected manager from the search results
    setManagerData(prevManagerData =>
      prevManagerData.filter((manager) => manager._id !== selectedManager._id)
    );

    setResultsVisible(false); // Close the results after clicking a manager
    console.log('Selected Managers:', selectedManagers);
    props.handleManagerSelection(selectedManager);
  } catch (error) {
    console.error('Error fetching admin name:', error.message);
  }
};

  useEffect(() => {
    console.log('Selected Managersuseeffect:', selectedManagers);
  }, [selectedManagers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/getprojectManager?search=${search}`;
      const adminToken = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: adminToken,
        },
      };

      const res = await axios.get(url, config);
      setManagerData(res.data);
      setResultsVisible(true); // Show results after a successful search
      setError('');
    } catch (error) {
      console.error('Error during manager search:', error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.error('Detailed error response from the server:', error.response.data);
        setError(error.response.data.message);
        setManagerData([]);
      } else {
        setError('Manager search failed. Please try again.');
        setManagerData([]);
      }
    }
  };

  const handleDocumentClick = (e) => {
    // Check if the click is outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setResultsVisible(false);
    }
  };

  useEffect(() => {
    // Add a click event listener to the document
    document.addEventListener('click', handleDocumentClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  const handleAddToProject = () => {
    // TODO: Send a request to add selected managers to the project
    console.log('Selected Managers:', selectedManagers);
    // You can use axios.post to send a request to your server to add managers to the projectManagers array
  };

  return (
    <div className="content" style={{ background: 'transparent', position: 'relative', height: '70px' }}>
      <form onSubmit={handleSubmit}>
        <div className="cut" style={{ zIndex: 1 }}>Add Manager</div>
        <div className="searchbar" style={{ display: 'flex', alignItems: 'center', height: '100%', borderRadius: '20px', marginTop: '20px' }}>
          <div className="input-container" style={{ width: '70%', background: '#d6d6d8', height: '40px', }}>
            <input
              id="description"
              style={{
                background: '#bababa',
                border: '0',
                boxSizing: 'border-box',
                color: '#eee',
                fontSize: '16px',
                height: '100%',
                outline: '0',
                padding: '0px 0px 0',
                width: '100%',
                height: '100%'
              }}
              type="text"
              placeholder=" "
              value={search}
              onChange={handleChange}
              required
            />
          </div>
          <div className="Search-button" style={{ width: '30%', background: "#424cbf", border: '0', boxSizing: 'border-box', color: '#eee', fontSize: '18px', height: '100%', padding: '9px 28px 0', height: '40px', alignItems: 'center' }} onClick={handleSubmit}>
            <SearchIcon />
          </div>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {isResultsVisible && managerData && managerData.length > 0 ? (
        <div ref={dropdownRef} className="result" style={{ background: '#808097', padding: '5px', position: 'absolute', top: '23%', left: 0, zIndex: 2 }}>
          {managerData.map((manager) => (
            <div key={manager._id} onClick={() => handleManagerClick(manager)} style={{ background: '#808097', padding: '5px', cursor: 'pointer', borderBottom: '2px solid #fff', width: 'fit-content' }}>
              <p style={{ borderRadius: '0px', color: '#fff', transition: 'background 0.3s', margin: 0 }} onMouseEnter={(e) => e.target.style.background = "#424cbf"} onMouseLeave={(e) => e.target.style.background = "#808097"} > {manager.username}</p>
            </div>
          ))}
        </div>
      ) : (
        isResultsVisible && managerData && <p>No manager found.</p>
      )}

      <div className="Selected">
        {selectedManagers.map((selectedManager, index) => (
          <div style={{ display: "inline-flex" }} key={index}>
            <p style={{ background: "#424cbf", borderRadius: "5px", padding: "8px", marginRight: "10px", marginbottom: "15px", color: "#fff", cursor: "pointer", transition: "background 0.3s", width: "fit-content" }}   > {selectedManager.username}</p>
          </div>
        ))}
      </div>

      {/* {selectedManagers.length > 0 && (
        <button type="button" onClick={handleAddToProject}>
          Add Selected Managers to Project
        </button>
      )} */}
    </div>
  );
}

export default SearchManager;
