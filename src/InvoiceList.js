// src/InvoiceList.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import invoiceService from "./InvoiceService";
import clientService from "./ClientService";

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);
  const [clientsMap, setClientsMap] = useState({});

  const fetchAll = async () => {
    try {
      const [invRes, clientRes] = await Promise.all([
        invoiceService.getAllInvoices(),
        clientService.getAllClients(),
      ]);
      setInvoices(invRes.data || []);
      const map = {};
      (clientRes.data || []).forEach((c) => (map[c.id] = c.name));
      setClientsMap(map);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this invoice?")) return;
    try {
      await invoiceService.deleteInvoice(id);
      setInvoices((prev) => prev.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Error deleting invoice:", err);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link to="/invoices/add" className="bg-blue-500 text-white px-4 py-2 rounded">Add Invoice</Link>
      </div>

      <table className="table-auto w-full bg-white shadow rounded">
        <thead>
          <tr>
            <th className="px-2 py-1 border">ID</th>
            <th className="px-2 py-1 border">Invoice #</th>
            <th className="px-2 py-1 border">Client</th>
            <th className="px-2 py-1 border">Amount</th>
            <th className="px-2 py-1 border">Issue</th>
            <th className="px-2 py-1 border">Status</th>
            <th className="px-2 py-1 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td className="px-2 py-1 border">{inv.id}</td>
              <td className="px-2 py-1 border">{inv.invoiceNumber}</td>
              <td className="px-2 py-1 border">{clientsMap[inv.clientId] || inv.clientId}</td>
              <td className="px-2 py-1 border">{inv.amount}</td>
              <td className="px-2 py-1 border">{inv.issueDate}</td>
              <td className="px-2 py-1 border">{inv.status}</td>
              <td className="px-2 py-1 border">
                <Link to={`/invoices/edit/${inv.id}`} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</Link>
                <button onClick={() => handleDelete(inv.id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
