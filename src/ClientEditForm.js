import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ClientEditForm.css";

const ClientEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    axios.get(`https://invoicex-i3y4.onrender.com/api/clients/${id}`)
      .then((response) => {
        setClient(response.data);
      })
      .catch((error) => console.error("Error fetching client:", error));
  }, [id]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`https://invoicex-i3y4.onrender.com/api/clients/${id}`, client)
      .then(() => {
        navigate("/clients");
      })
      .catch((error) => console.error("Error updating client:", error));
  };

  return (
    <div className="edit-client-container">
      <h2 className="form-title">Edit Client</h2>
      <form onSubmit={handleSubmit} className="edit-client-form">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={client.name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={client.phone}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="address"
            value={client.address}
            onChange={handleChange}
            className="form-textarea"
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary">Update</button>
          <button type="button" className="btn-secondary" onClick={() => navigate("/clients")}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClientEditForm;
