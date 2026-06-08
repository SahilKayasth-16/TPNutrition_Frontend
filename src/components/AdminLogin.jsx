import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../styles/AdminLogin.css";
import Logo from '../assets/logo.png';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      console.log("API URL:", process.env.REACT_APP_API_URL);

      const res = await fetch("https://tpnutrition-backend.onrender.com/admin/login",
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      
      const data = await res.json();
      if (data.success) {
        alert('Login successful');
        navigate('/admin/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Something went wrong.');
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        {/* Brand Header */}
        <div className="admin-login-brand">
          <img src={Logo} alt="TP Nutrition Logo" className="login-logo" />
          <span className="login-brand-name">TP Nutrition</span>
          <span className="login-title">Admin Portal</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username"
              name="username" 
              placeholder="Enter admin username" 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              name="password" 
              placeholder="Enter admin password" 
              onChange={handleChange} 
              required 
            />
          </div>

          <button type="submit" className="btn-login-submit">Login</button>
        </form>

        {/* Animated Error container */}
        {error && (
          <div className="login-error-container">
            {error}
          </div>
        )}

        {/* Back Link to Client App */}
        <Link to="/" className="btn-back-home">
          <i className="fa-solid fa-arrow-left"></i> Back to Main Site
        </Link>
      </div>
    </div>
  );
};

export default AdminLogin;