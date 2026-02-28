import React, { useState, useEffect } from "react";
import "../styles/AdminDashboard.css";

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

  return (
    <div style={{ padding: "20px", margin: "auto", justifyContent: "center" }}>
      <h1>Admin Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <h3>Add New Transformation</h3>
        <input name="name" value={form.name} placeholder="Name" onChange={handleChange} required />
        <input name="age" type="number" value={form.age} placeholder="Age" onChange={handleChange} required />
        <input name="goal" placeholder="Goal" value={form.goal} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <input type="file" name="imageBefore" onChange={handleFileChange} required />
        <input type="file" name="imageAfter" onChange={handleFileChange} required />
        <button type="submit">Add</button>
      </form>

      <h3>Existing Transformations</h3>

      <table border="1" width="100%">
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
              <td><img src={`${process.env.REACT_APP_API_URL}${item.imageBefore}`} width="80" alt={`${item.name} before progress`} /></td>
              <td><img src={`${process.env.REACT_APP_API_URL}${item.imageAfter}`} width="80" alt={`${item.name} after progress`}/></td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.goal}</td>
              <td>{item.description}</td>
              <td>
                <button onClick={() => handleDelete(item._id)} style={{ background: "red", color: "white" }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
