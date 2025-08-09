// src/ClientList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import clientService from "./ClientService";

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
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link to="/clients/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Client</Link>
      </div>

      <table className="table-auto w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-2 py-1 border">ID</th>
            <th className="px-2 py-1 border">Name</th>
            <th className="px-2 py-1 border">Email</th>
            <th className="px-2 py-1 border">Company</th>
            <th className="px-2 py-1 border">Phone</th>
            <th className="px-2 py-1 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((c) => (
            <tr key={c.id}>
              <td className="px-2 py-1 border">{c.id}</td>
              <td className="px-2 py-1 border">{c.name}</td>
              <td className="px-2 py-1 border">{c.email}</td>
              <td className="px-2 py-1 border">{c.company}</td>
              <td className="px-2 py-1 border">{c.phone}</td>
              <td className="px-2 py-1 border">
                <Link to={`/clients/edit/${c.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</Link>
                <button onClick={() => handleDelete(c.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
