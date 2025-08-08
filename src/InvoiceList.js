import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BASE_URL = process.env.REACT_APP_API_URL;

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/invoices`)
      .then(response => setInvoices(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">All Invoices</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 shadow rounded">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b">Invoice #</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{inv.invoiceNumber}</td>
                <td className="py-2 px-4 border-b">₹{inv.amount}</td>
                <td className="py-2 px-4 border-b">{inv.status}</td>
                <td className="py-2 px-4 border-b space-x-2">
                  <Link to={`/edit/${inv.id}`} className="text-blue-600 hover:underline">Edit</Link>
                  <button className="text-red-500 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvoiceList;
