import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../Styles/LogIn.css';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignUp() {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5001/auth/adminregister";
       console.log(userData);
      const res = await axios.post(url, userData);
      console.log(userData);
      console.log(res);
      
      // Show success 
      toast.success("Admin registerd successfully!",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
      
      // Navigate to the home page
      navigate("/login");
    } catch (error) {
      console.error('Error during signup:', error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.error('Detailed error response from the server:', error.response.data);
        setError(error.response.data.message);
      } else {
        // Show a general error message
        setError('Signup failed. Please try again.');
        toast.error("Admin registerd failed!",{
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
    }
  };

  return (
    <div className="container-body">
      <div className="container-login">
        <div className="title">Admin Registration</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-boxLogin">
                <span className="details">Username</span>
                <input
                  type="text"
                  placeholder="Enter your username"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-boxLogin">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter your password"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="button">
              <input type="submit" value="Register" />
              <p className="centered-text">
                Already have an Account{' '}
                <Link className="link" to="/login">
                  LogIn
                </Link>
              </p>
            </div>
          </form>
          {error && <p className="error-message">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default SignUp;
