import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import API, { invoicesBase, clientsBase } from '../api';

const money = (value) => new Intl.NumberFormat('en-IN', { style:'currency', currency:'INR', maximumFractionDigits:2 }).format(Number(value || 0));
const prettyDate = (value) => value ? new Date(value + 'T00:00:00').toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'}) : '—';

export default function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [query, setQuery] = useState(() => new URLSearchParams(window.location.search).get('q') || '');
  const [status, setStatus] = useState('ALL');
  const [notice, setNotice] = useState('');

  const fetchData = async () => {
    try {
      const [invoiceResponse, clientResponse] = await Promise.all([
        API.get(invoicesBase),
        API.get(clientsBase).catch(() => ({ data: [] }))
      ]);
      setInvoices(invoiceResponse.data || []);
      setClients(clientResponse.data || []);
      setError('');
    } catch (e) {
      setInvoices([]);
      setError(e?.response?.status === 401 ? 'Your session may have expired. Please sign in again.' : 'Could not load invoices. Check that the API is available, then retry.');
    } finally { setLoading(false); }
  };
  useEffect(() => { fetchData(); }, []);

  const filtered = useMemo(() => invoices.filter(inv => {
    const term = query.trim().toLowerCase();
    const matchesText = !term || [inv.invoiceNumber, inv.status, String(inv.id)].some(v => String(v || '').toLowerCase().includes(term));
    const matchesStatus = status === 'ALL' || String(inv.status || '').toUpperCase() === status;
    return matchesText && matchesStatus;
  }), [invoices, query, status]);

  const totals = useMemo(() => ({
    amount: invoices.reduce((sum, inv) => sum + Number(inv.amount || 0), 0),
    paid: invoices.filter(inv => String(inv.status).toUpperCase() === 'PAID').reduce((sum, inv) => sum + Number(inv.amount || 0), 0),
    pending: invoices.filter(inv => String(inv.status).toUpperCase() === 'PENDING').reduce((sum, inv) => sum + Number(inv.amount || 0), 0),
    overdue: invoices.filter(inv => String(inv.status).toUpperCase() === 'PENDING' && inv.dueDate && new Date(inv.dueDate + 'T23:59:59') < new Date()).length
  }), [invoices]);

  const remove = async (id) => {
    if (!window.confirm('Delete this invoice? This action cannot be undone.')) return;
    try {
      await API.delete(`${invoicesBase}/${id}`);
      setNotice('Invoice deleted successfully.');
      await fetchData();
    } catch (e) { setError('Could not delete this invoice. Refresh the page and try again.'); }
  };
  const downloadPdf = async (id, number) => {
    try {
      const res = await API.get(`${invoicesBase}/${id}/pdf`, { responseType:'blob' });
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url; a.download = `invoice-${number || id}.pdf`;
      document.body.appendChild(a); a.click(); a.remove(); window.URL.revokeObjectURL(url);
    } catch (e) { setError('Could not download the PDF. Check the invoice and API connection.'); }
  };

  const statusClass = (value) => {
    const normalized = String(value || '').toLowerCase();
    return normalized === 'paid' ? 'status-paid' : normalized === 'pending' ? 'status-pending' : normalized === 'cancelled' ? 'status-cancelled' : '';
  };

  if (loading) return <div className="card p-16"><div className="muted">Loading your workspace…</div></div>;

  return (
    <section>
      <div className="page-heading">
        <div><div className="eyebrow">Your workspace</div><h1>Invoice dashboard</h1><div className="muted">Track payments, manage clients, and keep every invoice moving.</div></div>
        <Link className="btn btn-primary" to="/invoices/new">＋ Create invoice</Link>
      </div>

      <div className="hero-strip">
        <h2>Your business, in better focus.</h2>
        <p>A clear view of what you've billed, what has been paid, and what needs a follow-up — all in one place.</p>
      </div>

      {error && <div className="error mb-16">{error}</div>}
      {notice && <div className="success mb-16">{notice}</div>}

      <div className="stat-grid">
        <div className="card stat-card card-hover"><div className="stat-label">Total invoiced</div><div className="stat-value">{money(totals.amount)}</div><div className="stat-note">{invoices.length} invoice{invoices.length === 1 ? '' : 's'} created</div></div>
        <div className="card stat-card card-hover"><div className="stat-label">Collected</div><div className="stat-value" style={{color:'#047857'}}>{money(totals.paid)}</div><div className="stat-note">{invoices.filter(i => String(i.status).toUpperCase() === 'PAID').length} paid invoices</div></div>
        <div className="card stat-card card-hover"><div className="stat-label">Awaiting payment</div><div className="stat-value" style={{color:'#b45309'}}>{money(totals.pending)}</div><div className="stat-note">Pending invoice balance</div></div>
        <div className="card stat-card card-hover"><div className="stat-label">Overdue invoices</div><div className="stat-value" style={{color:totals.overdue ? '#b91c1c' : '#172033'}}>{totals.overdue}</div><div className="stat-note">Pending past due date</div></div>
      </div>

      <div className="card">
        <div className="toolbar">
          <div style={{minWidth:190}}><h2 style={{margin:'0 0 4px'}}>All invoices</h2><div className="muted" style={{fontSize:13}}>Search, filter, download, and manage invoices.</div></div>
          <div className="search-wrap"><span className="search-icon">⌕</span><input aria-label="Search invoices" placeholder="Search invoice number or ID…" value={query} onChange={e => setQuery(e.target.value)} /></div>
          <select aria-label="Filter by status" style={{width:'auto',minWidth:145}} value={status} onChange={e => setStatus(e.target.value)}>
            <option value="ALL">All statuses</option><option value="PENDING">Pending</option><option value="PAID">Paid</option><option value="CANCELLED">Cancelled</option>
          </select>
          <button className="btn btn-secondary" onClick={() => {setQuery('');setStatus('ALL');setNotice('Filters cleared.');}}>Reset</button>
        </div>
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">▤</div>
            <h2>{invoices.length ? 'No matching invoices' : 'Your first invoice starts here'}</h2>
            <p className="muted">{invoices.length ? 'Try a different search or status filter.' : 'Create an invoice, attach a client, and keep your billing organized.'}</p>
            {invoices.length ? <button className="btn btn-secondary" onClick={() => {setQuery('');setStatus('ALL');}}>Clear filters</button> : <Link className="btn btn-primary" to="/invoices/new">＋ Create your first invoice</Link>}
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead><tr><th>Invoice</th><th>Issue date</th><th>Due date</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead>
              <tbody>
                {filtered.map(inv => (
                  <tr key={inv.id}>
                    <td><div style={{fontWeight:800,color:'#1e293b'}}>{inv.invoiceNumber || `INV-${inv.id}`}</div><div className="muted" style={{fontSize:12}}>ID #{inv.id}</div></td>
                    <td>{prettyDate(inv.issueDate)}</td><td>{prettyDate(inv.dueDate)}</td>
                    <td style={{fontWeight:800,whiteSpace:'nowrap'}}>{money(inv.amount)}</td>
                    <td><span className={`status-pill ${statusClass(inv.status)}`}>{inv.status || 'UNKNOWN'}</span></td>
                    <td><div className="flex gap-8" style={{flexWrap:'wrap'}}>
                      <Link className="btn btn-secondary" to={`/invoices/${inv.id}`}>Edit</Link>
                      <button className="btn btn-secondary" onClick={() => downloadPdf(inv.id, inv.invoiceNumber)}>↓ PDF</button>
                      <button className="btn btn-danger" onClick={() => remove(inv.id)}>Delete</button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div style={{padding:'14px 18px',borderTop:'1px solid #edf0f5',display:'flex',justifyContent:'space-between',gap:12,flexWrap:'wrap',fontSize:12,color:'#64748b'}}>
          <span>Showing {filtered.length} of {invoices.length} invoices</span><span>{clients.length} client{clients.length === 1 ? '' : 's'} in your workspace</span>
        </div>
      </div>
    </section>
  );
}
