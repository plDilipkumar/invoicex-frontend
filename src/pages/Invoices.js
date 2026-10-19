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
      setError('');
    } catch (e) {
      setInvoices([]);
      setError(e?.response?.status === 401 ? 'Your session may have expired. Please sign in again.' : 'Could not load invoices. Check that the API is available, then retry.');
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchData(); }, []);

  const remove = async (id) => {
    if (!window.confirm('Delete invoice?')) return;
    try {
      await API.delete(`${invoicesBase}/${id}`);
      await fetchData();
    } catch (e) {
      setError('Could not delete this invoice. Refresh the page and try again.');
    }
  };
  const downloadPdf = async (id) => {
    try {
      const res = await API.get(`${invoicesBase}/${id}/pdf`, { responseType: 'blob' });
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `invoice-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (e) {
      setError('Could not download the PDF. Check the invoice and API connection.');
    }
  };

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


