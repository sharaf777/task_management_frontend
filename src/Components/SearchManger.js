import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

function SearchManager() {
  const [search, setSearch] = useState('');
  const [managerData, setManagerData] = useState([]);
  const [selectedManagers, setSelectedManagers] = useState([]);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleManagerClick = (selectedManager) => {
    setSelectedManagers([...selectedManagers, selectedManager]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:5001/auth/getprojectManager?search=${search}`;
      console.log('url', url);

      const adminToken = localStorage.getItem('adminToken');
      const config = {
        headers: {
          Authorization: adminToken,
        },
      };

      const res = await axios.get(url, config);
      console.log('res', res);
      const mgdata = res.data;
      console.log('mgdata', mgdata);
      setManagerData(res.data);
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
        alert('Manager search failed!');
        setManagerData([]);
      }
    }
  };

  return (
    
     
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'flex', alignItems: 'center', borderRadius: '12px',background: '#d6d6d8', PaddingTop:'-10px'}}>
              <div className="input-container" style={{ width: '70%',background: '#d6d6d8', }}>
                <input
                  id="description"
                  style={{
                    
                    
                    border: '0',
                    boxSizing: 'border-box',
                    color: '#eee',
                    fontSize: '18px',
                    height: '100%',
                    outline: '0',
                    padding: '4px 20px 0',
                    width: '100%',
                }}
                  type="text"
                  placeholder=" "
                  value={search}
                  onChange={handleChange}
                  required
                />
                <div className="cut">Manager ID</div>
                <label htmlFor="description" className="placeholder">
                  Enter manager's ID
                </label>
              </div>
              <div className="button" style={{ width: '30%' ,
                   
                    border: '0',
                    boxSizing: 'border-box',
                    color: '#eee',
                    fontSize: '18px',
                    height: '100%',
                    }} 
                    onClick={handleSubmit}>
                <SearchIcon />
              </div>
            </div>
            
          </form>
          {error && <p className="error-message">{error}</p>}
          {managerData && managerData.length > 0 ? (
            <div className="result">
              {managerData.map((manager) => (
                
                <div  key={manager._id} onClick={() => handleManagerClick(manager)}>
                  <p style={{background:"#808097", borderRadius:"5px",paddingLeft:"20px", paddingRight:"20px",marginbottom:"15px", color:"#fff", cursor: "pointer",  transition: "background 0.3s", width:"fit-content"}} onMouseEnter={(e) => e.target.style.background = "#424cbf"}  
                    onMouseLeave={(e) => e.target.style.background = "#808097"} > {manager.username}</p>
                </div>

              ))}
            </div>
            
          ) : (
            managerData && <p>No manager found.</p>
          )}

          {/* Display selected managers */}
          <div>
            <h2>Selected Managers</h2>
            {selectedManagers.map((selectedManager, index) => (
              <div key={index}>
                <p>Username: {selectedManager.username}</p>
              </div>
            ))}
          </div>
        </div>
     
  );
}

export default SearchManager;
