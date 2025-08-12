import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import clientService from "./ClientService";
import invoiceService from "./InvoiceService";
import "./InvoiceForm.css"; // new CSS import

const InvoiceForm = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    invoiceNumber: "",
    issueDate: "",
    dueDate: "",
    amount: "",
    status: "PENDING",
    clientId: ""
  });

  useEffect(() => {
    clientService
      .getAllClients()
      .then(res => setClients(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await invoiceService.createInvoice(form);
      navigate("/invoices");
    } catch (err) {
      console.error("Error creating invoice:", err);
      alert("Failed to create invoice");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="invoice-form">
      <h2>Add Invoice</h2>

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
        {clients.map(c => (
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

      <button type="submit">Save Invoice</button>
    </form>
  );
};

export default InvoiceForm;
