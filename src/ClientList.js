import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clientService from "./ClientService";
import "./ClientList.css"; // Import CSS

const ClientList = () => {
  const [clients, setClients] = useState([]);

  const fetchClients = async () => {
    try {
      const res = await clientService.getAllClients();
      setClients(res.data);
    } catch (err) {
      console.error("Failed to fetch clients:", err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this client?")) return;
    try {
      await clientService.deleteClient(id);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Error deleting client:", err);
    }
  };

  return (
    <div className="client-list-container">
      <div className="client-list-header">
        <h1>Clients</h1>
        <Link to="/clients/add" className="btn-add">
          + Add Client
        </Link>
      </div>

      <table className="client-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.company}</td>
              <td>{c.phone}</td>
              <td>
                <Link to={`/clients/edit/${c.id}`} className="btn-edit">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="btn-delete"
                >
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

export default ClientList;
