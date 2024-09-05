import React, { useState } from 'react';
import '../Css/Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Please enter Username first";
    if (!password) newErrors.password = "Please enter Password to proceed";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await axios.post('http://localhost:3000/auth/admin', {
        username: username,
        password: password
      });

      if (response.data.success) {
        console.log('Response:', response.data.msg);

        // Store the JWT token in localStorage
        const dataToSet = response.data.data;
        localStorage.setItem('token', dataToSet.token);
        localStorage.setItem('userId', dataToSet._id);

        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        alert(response.data.msg);
      }
    } catch (error) {
      console.error("Error in API call:", error);
      alert('Incorrect Username and Password');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSubmit(event);
    }
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Welcome Admin!</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="login-input"
        />
        {errors.username && <small className="text-danger">{errors.username}</small>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          className="login-input"
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </div>
      <div className="button-container">
        <button className="wallet-button" onClick={handleSubmit}>Login</button>
      </div>
    </div>
  );
};

export default Login;
