import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API, { invoicesBase, clientsBase } from '../api';

export default function InvoiceForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ invoiceNumber:'', issueDate:'', dueDate:'', amount:'', status:'PENDING', clientId:'' });
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get(clientsBase);
        setClients(data);
      } catch (e) {
        setError('Could not load clients. Check that the API is available.');
      }
    })();
  }, []);
  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data } = await API.get(`${invoicesBase}/${id}`);
        setForm({ ...data });
      } catch (e) {
        setError('Could not load this invoice. It may not exist or may not belong to this account.');
      }
    })();
  }, [id, isEdit]);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) await API.put(`${invoicesBase}/${id}`, form); else await API.post(invoicesBase, form);
      navigate('/');
    } catch (e1) { setError('Failed to save'); }
  };

  return (
    <div className="card p-16" style={{ maxWidth: 720, margin:'24px auto' }}>
      <h2 className="mb-16">{isEdit ? 'Edit' : 'New'} Invoice</h2>
      {error && <div className="error mb-16">{error}</div>}
      <form onSubmit={save} className="flex gap-12" style={{ flexDirection:'column' }}>
        <div className="flex gap-12">
          <div style={{ flex:1 }}>
            <label>Invoice Number</label>
            <input value={form.invoiceNumber} onChange={(e)=>setForm({ ...form, invoiceNumber:e.target.value })} required />
          </div>
          <div style={{ flex:1 }}>
            <label>Client</label>
            <select value={form.clientId} onChange={(e)=>setForm({ ...form, clientId: e.target.value })} required>
              <option value="">Select Client</option>
              {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <div className="flex gap-12">
          <div style={{ flex:1 }}>
            <label>Issue Date</label>
            <input type="date" value={form.issueDate} max={form.dueDate || undefined} onChange={(e)=>setForm({ ...form, issueDate:e.target.value })} required />
          </div>
          <div style={{ flex:1 }}>
            <label>Due Date</label>
            <input type="date" value={form.dueDate} min={form.issueDate || undefined} onChange={(e)=>setForm({ ...form, dueDate:e.target.value })} required />
          </div>
          <div style={{ flex:1 }}>
            <label>Amount</label>
            <input type="number" min="0.01" step="0.01" value={form.amount} onChange={(e)=>setForm({ ...form, amount:e.target.value })} required />
          </div>
        </div>
        <div>
          <label>Status</label>
          <select value={form.status} onChange={(e)=>setForm({ ...form, status:e.target.value })}>
            <option value="PENDING">PENDING</option>
            <option value="PAID">PAID</option>
            <option value="CANCELLED">CANCELLED</option>
          </select>
        </div>
        <div className="flex gap-12">
          <button className="btn btn-primary">Save</button>
          <a className="btn btn-secondary" href="/">Cancel</a>
        </div>
      </form>
    </div>
  );
}


