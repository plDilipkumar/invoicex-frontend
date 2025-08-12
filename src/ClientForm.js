import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clientService from "./ClientService";
import "./ClientForm.css"; // Import the CSS file

const ClientForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    address: ""
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clientService.createClient(form);
      navigate("/clients");
    } catch (err) {
      console.error("Error creating client:", err);
      alert("Error creating client — check console");
    }
  };

  return (
    <div className="client-form-container">
      <h2 className="form-title">Add Client</h2>
      <form onSubmit={handleSubmit} className="client-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Name"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            type="email"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Company:</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            className="form-textarea"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">
            Save Client
          </button>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/clients")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientForm;
