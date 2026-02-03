import React, { useEffect, useState } from 'react';
import API, { clientsBase } from '../api';

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name:'', email:'', phone:'', address:'' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const load = async () => {
    try {
      const { data } = await API.get(clientsBase);
      setClients(data);
      setError('');
    } catch (e) {
      setError('Failed to load clients');
    }
  };
  useEffect(() => { load(); }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`${clientsBase}/${editingId}`, form);
      } else {
        await API.post(clientsBase, form);
      }
      setForm({ name:'', email:'', phone:'', address:'' });
      setEditingId(null);
      setError('');
      load();
    } catch (err) {
      setError(err?.response?.data?.message || 'Save failed');
    }
  };
  const remove = async (id) => {
    if (!window.confirm('Delete client?')) return;
    try {
      await API.delete(`${clientsBase}/${id}`);
      load();
    } catch (err) {
      const status = err?.response?.status;
      if (status === 403) {
        setError('Forbidden (403). Please login again or check permissions.');
      } else if (status === 409) {
        setError('Cannot delete: client is used by one or more invoices.');
      } else {
        setError('Delete failed');
      }
    }
  };
  const startEdit = (c) => { setEditingId(c.id); setForm({ name:c.name||'', email:c.email||'', phone:c.phone||'', address:c.address||'' }); };
  const cancelEdit = () => { setEditingId(null); setForm({ name:'', email:'', phone:'', address:'' }); setError(''); };

  return (
    <div className="flex gap-12" style={{ alignItems: 'flex-start' }}>
      <div className="card p-16" style={{ flex: 1 }}>
        <h2 className="mb-16">Clients</h2>
        {error && <div className="error mb-16">{error}</div>}
        <table>
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th></th></tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td className="flex gap-8">
                  <button className="btn btn-secondary" onClick={() => startEdit(c)}>Edit</button>
                  <button className="btn btn-danger" onClick={() => remove(c.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card p-16" style={{ width: 380 }}>
        <h3 className="mb-16">{editingId ? 'Edit Client' : 'Add Client'}</h3>
        <form onSubmit={save} className="flex gap-12" style={{ flexDirection:'column' }}>
          <div>
            <label>Name</label>
            <input value={form.name} onChange={(e)=>setForm({ ...form, name:e.target.value })} required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" value={form.email} onChange={(e)=>setForm({ ...form, email:e.target.value })} />
          </div>
          <div>
            <label>Phone</label>
            <input value={form.phone} onChange={(e)=>setForm({ ...form, phone:e.target.value })} />
          </div>
          <div>
            <label>Address</label>
            <input value={form.address} onChange={(e)=>setForm({ ...form, address:e.target.value })} />
          </div>
          <div className="flex gap-12">
            <button className="btn btn-primary" type="submit">{editingId ? 'Update' : 'Save'}</button>
            {editingId && <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
      </div>
    </div>
  );
}


