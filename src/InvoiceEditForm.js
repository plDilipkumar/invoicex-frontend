// src/InvoiceEditForm.js
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import invoiceService from "./InvoiceService";
import clientService from "./ClientService";

const InvoiceEditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    invoiceNumber: "",
    issueDate: "",
    dueDate: "",
    amount: "",
    status: "",
    clientId: ""
  });

  useEffect(() => {
    const load = async () => {
      try {
        const [invoiceRes, clientsRes] = await Promise.all([
          invoiceService.getInvoiceById(id),
          clientService.getAllClients()
        ]);
        const inv = invoiceRes.data;
        setForm({
          invoiceNumber: inv.invoiceNumber || "",
          issueDate: inv.issueDate || "",
          dueDate: inv.dueDate || "",
          amount: inv.amount || "",
          status: inv.status || "",
          clientId: inv.clientId || ""
        });
        setClients(clientsRes.data || []);
      } catch (err) {
        console.error("Error loading data:", err);
        alert("Failed to load invoice");
      }
    };
    load();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await invoiceService.updateInvoice(id, form);
      navigate("/invoices");
    } catch (err) {
      console.error("Error updating invoice:", err);
      alert("Failed to update invoice");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 shadow rounded max-w-lg">
      <h2 className="text-xl font-bold mb-4">Edit Invoice</h2>

      <input name="invoiceNumber" value={form.invoiceNumber} onChange={handleChange} required placeholder="Invoice Number" className="border p-2 w-full mb-3" />

      <select name="clientId" value={form.clientId} onChange={handleChange} required className="border p-2 w-full mb-3">
        <option value="">Select Client</option>
        {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
      </select>

      <input type="number" name="amount" value={form.amount} onChange={handleChange} required placeholder="Amount" className="border p-2 w-full mb-3" />

      <input type="date" name="issueDate" value={form.issueDate} onChange={handleChange} required className="border p-2 w-full mb-3" />
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} required className="border p-2 w-full mb-3" />

      <select name="status" value={form.status} onChange={handleChange} className="border p-2 w-full mb-3">
        <option value="PENDING">PENDING</option>
        <option value="PAID">PAID</option>
        <option value="OVERDUE">OVERDUE</option>
      </select>

      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Update Invoice</button>
    </form>
  );
};

export default InvoiceEditForm;
