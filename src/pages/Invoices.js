import React, { useEffect, useState } from 'react';
import API, { invoicesBase } from '../api';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      const { data } = await API.get(invoicesBase);
      setInvoices(data);
    } catch (e) { setError('Failed to load invoices'); } finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const remove = async (id) => { if (!window.confirm('Delete invoice?')) return; await API.delete(`${invoicesBase}/${id}`); fetchData(); };
  const downloadPdf = async (id) => { const res = await API.get(`${invoicesBase}/${id}/pdf`, { responseType:'blob' }); const url = window.URL.createObjectURL(res.data); const a = document.createElement('a'); a.href=url; a.download='invoice.pdf'; a.click(); };

  if (loading) return <div>Loading…</div>;
  return (
    <div className="card p-16">
      <div className="flex justify-between items-center mb-16">
        <h2>Invoices</h2>
        <a className="btn btn-primary" href="/invoices/new">New Invoice</a>
      </div>
      {error && <div className="error mb-16">{error}</div>}
      <table>
        <thead>
          <tr><th>No.</th><th>Issue</th><th>Due</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.issueDate}</td>
              <td>{inv.dueDate}</td>
              <td>{inv.amount}</td>
              <td>{inv.status}</td>
              <td className="flex gap-8">
                <a className="btn btn-secondary" href={`/invoices/${inv.id}`}>Edit</a>
                <button className="btn btn-danger" onClick={() => remove(inv.id)}>Delete</button>
                <button className="btn btn-secondary" onClick={() => downloadPdf(inv.id)}>PDF</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


