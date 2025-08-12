import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import invoiceService from "./InvoiceService";
import clientService from "./ClientService";
import "./InvoiceList.css";

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
    <div className="invoice-container">
      <div className="invoice-header">
        <h1>Invoices</h1>
        <Link to="/invoices/add" className="btn-add">Add Invoice</Link>
      </div>

      <table className="invoice-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Invoice #</th>
            <th>Client</th>
            <th>Amount</th>
            <th>Issue</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.invoiceNumber}</td>
              <td>{clientsMap[inv.clientId] || inv.clientId}</td>
              <td>{inv.amount}</td>
              <td>{inv.issueDate}</td>
              <td className={`status-${inv.status?.toLowerCase()}`}>{inv.status}</td>
              <td>
                <Link to={`/invoices/edit/${inv.id}`} className="btn-edit">Edit</Link>
                <button onClick={() => handleDelete(inv.id)} className="btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;
