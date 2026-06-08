import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";
import Logo from "../assets/logo.png";

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({
    name: "",
    age: "",
    goal: "",
    description: "",
    imageBefore: null,
    imageAfter: null
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/testimonial`)
      .then(res => res.json())
      .then(result => setData(result))
      .catch(err => console.error("Error fetching data:", err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach(key => formData.append(key, form[key]));

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/testimonial`, {
        method: "POST",
        body: formData
      });

      const result = await res.json();
      alert(result.message);

      setData(prev => [...prev, result.data]);
      setForm({ name: "", age: "", goal: "", description: "", imageBefore: null, imageAfter: null });

      // Reset the file input fields manually since they are uncontrolled
      const fileInputs = document.querySelectorAll('input[type="file"]');
      fileInputs.forEach(input => {
        input.value = "";
      });

    } catch (err) {
      console.error("Error adding testimonial:", err);
      alert("Error adding testimonial");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/testimonial/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) {
        throw new Error("Failed to delete testimonial");
      }

      const result = await res.json();
      alert(result.message);

      setData(prev => prev.filter(item => item._id !== id));

    } catch (err) {
      console.error("Error deleting testimonial:", err);
      alert("Error deleting testimonial");
    }
  };

  const handleLogout = () => {
    // Navigate back to the admin login page
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard-container">
      {/* Premium Navigation Header */}
      <header className="admin-header">
        <div className="admin-header-brand">
          <img src={Logo} alt="TP Nutrition Logo" className="admin-logo" />
          <span className="admin-brand-name">TP Nutrition</span>
          <span className="admin-header-separator">/</span>
          <span className="admin-page-title">Admin Dashboard</span>
        </div>
        <div className="admin-header-actions">
          <a 
            href="https://www.tpnutrition.in" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-main-site"
          >
            Visit Main Site
          </a>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="admin-dashboard-main">
        {/* Left/Top Section: Add Transformation Form */}
        <section className="form-card-container">
          <form onSubmit={handleSubmit} className="admin-form">
            <h3>Add New Transformation</h3>
            
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                id="name"
                name="name" 
                value={form.name} 
                placeholder="Enter client name" 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input 
                id="age"
                name="age" 
                type="number" 
                value={form.age} 
                placeholder="Enter client age" 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="goal">Goal</label>
              <input 
                id="goal"
                name="goal" 
                placeholder="e.g., Fat Loss, Muscle Gain" 
                value={form.goal} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea 
                id="description"
                name="description" 
                placeholder="Enter transformation details" 
                value={form.description} 
                onChange={handleChange} 
                required 
              />
            </div>

            <div className="form-group-files">
              <div className="file-field">
                <label>Before Image</label>
                <input type="file" name="imageBefore" onChange={handleFileChange} required />
              </div>
              <div className="file-field">
                <label>After Image</label>
                <input type="file" name="imageAfter" onChange={handleFileChange} required />
              </div>
            </div>

            <button type="submit" className="btn-submit">Add Transformation</button>
          </form>
        </section>

        {/* Right/Bottom Section: Existing Transformations */}
        <section className="table-card-container">
          <div className="table-card-header">
            <h3>Existing Transformations</h3>
            <span className="badge-count">{data.length} Total</span>
          </div>

          <div className="table-responsive-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Before</th>
                  <th>After</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Goal</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item._id}>
                    <td>
                      <div className="img-thumbnail-container">
                        <img 
                          src={`${process.env.REACT_APP_API_URL}${item.imageBefore}`} 
                          alt={`${item.name} before`} 
                        />
                      </div>
                    </td>
                    <td>
                      <div className="img-thumbnail-container">
                        <img 
                          src={`${process.env.REACT_APP_API_URL}${item.imageAfter}`} 
                          alt={`${item.name} after`} 
                        />
                      </div>
                    </td>
                    <td className="cell-name">{item.name}</td>
                    <td className="cell-age">{item.age}</td>
                    <td className="cell-goal">
                      <span className="goal-tag">{item.goal}</span>
                    </td>
                    <td className="cell-desc">{item.description}</td>
                    <td className="cell-action">
                      <button onClick={() => handleDelete(item._id)} className="btn-delete-row">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {data.length === 0 && (
              <div className="empty-state">
                <p>No transformations added yet.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;

