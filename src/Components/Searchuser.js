import React, { useState, useEffect, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import '../Styles/Projectcreate.css';

const SearchUser = (props) => {
  const [search, setSearch] = useState('');
  const [userData, setUserData] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [error, setError] = useState('');
  const [isResultsVisible, setResultsVisible] = useState(false);

  const dropdownRef = useRef(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleUserClick = async (selectedUser) => {
    // Store the selected user's details
    const { _id, username } = selectedUser;

    try {
      setSelectedUsers((prevSelectedUsers) => [
        ...prevSelectedUsers,
        { _id, username },
      ]);

      // Remove selected user from the search results
      setUserData((prevUserData) =>
        prevUserData.filter((user) => user._id !== selectedUser._id)
      );

      setResultsVisible(false); // Close the results after clicking a user
      console.log('Selected Users:', selectedUsers);
      // props.handleUserSelection(selectedUser); // If needed
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
     props.handleUserSelection(selectedUser);
  };

  useEffect(() => {
    console.log('Selected Users useEffect:', selectedUsers);
  }, [selectedUsers]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/auth/getAllmember?search=${search}`;
      const adminToken = localStorage.getItem('authToken');
      const config = {
        headers: {
          Authorization: adminToken,
        },
      };

      const res = await axios.get(url, config);
      setUserData(res.data);
      console.error('class user:', res.data);
      setResultsVisible(true); // Show results after a successful search
      setError('');
    } catch (error) {
      console.error('Error during user search:', error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.error(
          'Detailed error response from the server:',
          error.response.data
        );
        setError(error.response.data.message);
        setUserData([]);
      } else {
        setError('User search failed. Please try again.');
        setUserData([]);
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

  return (
    <div
      className="content"
      style={{
        background: 'transparent',
        position: 'relative',
        height: '70px',
      }}
    >
      <form onSubmit={handleSubmit}>
        <div
          className="cut"
          style={{ zIndex: 1 }}
        >
          Add User
        </div>
        <div
          className="searchbar"
          style={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            borderRadius: '20px',
            marginTop: '20px',
          }}
        >
          <div
            className="input-container"
            style={{
              width: '70%',
              background: '#d6d6d8',
              height: '40px',
            }}
          >
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
                height: '100%',
              }}
              type="text"
              placeholder=" "
              value={search}
              onChange={handleChange}
              required
            />
          </div>
          <div
            className="Search-button"
            style={{
              width: '30%',
              background: '#424cbf',
              border: '0',
              boxSizing: 'border-box',
              color: '#eee',
              fontSize: '18px',
              height: '100%',
              padding: '9px 28px 0',
              height: '40px',
              alignItems: 'center',
            }}
            onClick={handleSubmit}
          >
            <SearchIcon />
          </div>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {isResultsVisible && userData && userData.length > 0 ? (
        <div
          ref={dropdownRef}
          className="result"
          style={{
            background: '#808097',
            padding: '5px',
            position: 'absolute',
            top: '23%',
            left: 0,
            zIndex: 2,
          }}
        >
          {userData.map((user) => (
            <div
              key={user._id}
              onClick={() => handleUserClick(user)}
              style={{
                background: '#808097',
                padding: '5px',
                cursor: 'pointer',
                borderBottom: '2px solid #fff',
                width: 'fit-content',
              }}
            >
              <p
                style={{
                  borderRadius: '0px',
                  color: '#fff',
                  transition: 'background 0.3s',
                  margin: 0,
                }}
                onMouseEnter={(e) => (e.target.style.background = '#424cbf')}
                onMouseLeave={(e) => (e.target.style.background = '#808097')}
              >
                {' '}
                {user.username}
              </p>
            </div>
          ))}
        </div>
      ) : (
        isResultsVisible && userData && <p>No user found.</p>
      )}

      <div className="Selected">
        {selectedUsers.map((selectedUser, index) => (
          <div style={{ display: 'inline-flex' }} key={index}>
            <p
              style={{
                background: '#424cbf',
                borderRadius: '5px',
                padding: '8px',
                marginRight: '10px',
                marginbottom: '15px',
                color: '#fff',
                cursor: 'pointer',
                transition: 'background 0.3s',
                width: 'fit-content',
              }}
            >
              {' '}
              {selectedUser.username}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUser;
