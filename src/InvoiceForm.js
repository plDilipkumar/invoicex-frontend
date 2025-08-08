import React, { useState } from 'react';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL;

const InvoiceForm = () => {
  const [invoice, setInvoice] = useState({
    invoiceNumber: '',
    amount: '',
    status: '',
    clientId: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post(`${BASE_URL}/api/invoices`, invoice)
      .then(() => alert('Invoice created!'))
      .catch(err => console.error(err));
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Invoice</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 shadow rounded">
        <div>
          <label className="block font-semibold">Invoice Number</label>
          <input
            type="text"
            name="invoiceNumber"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Amount</label>
          <input
            type="number"
            name="amount"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-semibold">Status</label>
          <select
            name="status"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value="">Select</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold">Client ID</label>
          <input
            type="number"
            name="clientId"
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceForm;
