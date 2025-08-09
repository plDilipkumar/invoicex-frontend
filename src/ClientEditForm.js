// src/ClientEditForm.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import clientService from "./ClientService";

const ClientEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", address: "" });

  useEffect(() => {
    const load = async () => {
      try {
        const res = await clientService.getClientById(id);
        setForm(res.data);
      } catch (err) {
        console.error("Error loading client:", err);
        alert("Failed to load client");
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clientService.updateClient(id, form);
      navigate("/clients");
    } catch (err) {
      console.error("Error updating client:", err);
      alert("Failed to update client");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded max-w-lg">
      <h2 className="text-xl font-bold mb-4">Edit Client</h2>

      <input name="name" value={form.name} onChange={handleChange} required placeholder="Name" className="border p-2 w-full mb-3" />
      <input name="email" value={form.email} onChange={handleChange} required placeholder="Email" type="email" className="border p-2 w-full mb-3" />
      <input name="company" value={form.company} onChange={handleChange} placeholder="Company" className="border p-2 w-full mb-3" />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-2 w-full mb-3" />
      <input name="address" value={form.address} onChange={handleChange} placeholder="Address" className="border p-2 w-full mb-3" />

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Client</button>
    </form>
  );
};

export default ClientEditForm;
