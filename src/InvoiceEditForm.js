import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import invoiceService from "./InvoiceService";
import clientService from "./ClientService";
import "./InvoiceEditForm.css"; // Import CSS file

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
          issueDate: inv.issueDate ? inv.issueDate.substring(0, 10) : "",
          dueDate: inv.dueDate ? inv.dueDate.substring(0, 10) : "",
          amount: inv.amount || "",
          status: inv.status || "PENDING",
          clientId: inv.clientId || ""
        });
        setClients(clientsRes.data || []);
      } catch (err) {
        console.error("Error loading data:", err.response?.data || err.message);
        alert("Failed to load invoice");
      }
    };
    load();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await invoiceService.updateInvoice(id, {
        ...form,
        amount: parseFloat(form.amount),
        clientId: form.clientId ? parseInt(form.clientId, 10) : null
      });
      navigate("/invoices");
    } catch (err) {
      console.error("Error updating invoice:", err.response?.data || err.message);
      alert("Failed to update invoice: " + (err.response?.data?.message || ""));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-edit-form">
      <h2>Edit Invoice</h2>

      <input
        name="invoiceNumber"
        value={form.invoiceNumber}
        onChange={handleChange}
        required
        placeholder="Invoice Number"
      />

      <select
        name="clientId"
        value={form.clientId}
        onChange={handleChange}
        required
      >
        <option value="">Select Client</option>
        {clients.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <input
        type="number"
        name="amount"
        value={form.amount}
        onChange={handleChange}
        required
        placeholder="Amount"
        step="0.01"
      />

      <input
        type="date"
        name="issueDate"
        value={form.issueDate}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
        required
      />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="PENDING">PENDING</option>
        <option value="PAID">PAID</option>
        <option value="OVERDUE">OVERDUE</option>
      </select>

      <button type="submit">Update Invoice</button>
    </form>
  );
};

export default InvoiceEditForm;
