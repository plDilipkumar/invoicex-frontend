import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const EditInvoice = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [invoice, setInvoice] = useState({ ...state });

  const handleChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`${BASE_URL}/api/invoices/${invoice.id}`, invoice)
      .then(() => {
        alert('Invoice updated successfully!');
        navigate('/');
      })
      .catch((err) => console.error('Error updating invoice:', err));
  };

  return (
    <div>
      <h2>Edit Invoice</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="invoiceNumber"
          value={invoice.invoiceNumber || ''}
          onChange={handleChange}
          placeholder="Invoice #"
          required
        /><br />
        <input
          type="date"
          name="issueDate"
          value={invoice.issueDate || ''}
          onChange={handleChange}
          required
        /><br />
        <input
          type="date"
          name="dueDate"
          value={invoice.dueDate || ''}
          onChange={handleChange}
          required
        /><br />
        <input
          type="number"
          name="amount"
          value={invoice.amount || ''}
          onChange={handleChange}
          placeholder="Amount"
          required
        /><br />
        <input
          type="text"
          name="status"
          value={invoice.status || ''}
          onChange={handleChange}
          placeholder="Status"
          required
        /><br />
        <input
          type="number"
          name="clientId"
          value={invoice.clientId || ''}
          onChange={handleChange}
          placeholder="Client ID"
          required
        /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditInvoice;
