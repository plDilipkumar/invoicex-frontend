import React, { useState } from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Invoices from './pages/Invoices';
import InvoiceForm from './pages/InvoiceForm';
import Clients from './pages/Clients';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { isAuthenticated, logout } from './AuthService';

const Nav = () => {
  const location = useLocation();
  const signedIn = isAuthenticated();
  const [search, setSearch] = useState('');
  const submitSearch = (event) => {
    event.preventDefault();
    window.location.href = '/?q=' + encodeURIComponent(search.trim());
  };
  return (
    <>
      <header className="nav">
        <div className="nav-main">
          <Link to="/" className="brand"><span className="brand-mark">✦</span><span>Invoice<span className="brand-accent">X</span><small>BUSINESS WORKSPACE</small></span></Link>
          {signedIn && <form className="nav-search" onSubmit={submitSearch}><span aria-hidden="true">⌕</span><input aria-label="Search InvoiceX" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search invoices by number, ID or status" /><button type="submit">Search</button></form>}
          <nav className="nav-actions">
            {signedIn ? <><Link className={location.pathname === '/' || location.pathname.startsWith('/invoices') ? 'nav-link active' : 'nav-link'} to="/">▤ Invoices</Link><Link className={location.pathname.startsWith('/clients') ? 'nav-link active' : 'nav-link'} to="/clients">♙ Clients</Link><Link className="nav-create" to="/invoices/new">＋ New invoice</Link><button className="nav-logout" onClick={() => { logout(); window.location.href = '/login'; }}>Logout ↗</button></> : <><Link className="nav-link" to="/login">Login</Link><Link className="nav-create" to="/register">Create account</Link></>}
          </nav>
        </div>
      </header>
      {signedIn && <div className="nav-sub"><div className="nav-sub-inner"><span>WORKSPACE</span><Link to="/">Overview</Link><Link to="/">Invoices & payments</Link><Link to="/clients">Your clients</Link><span className="nav-sub-right">A simpler way to run your business <b>✦</b></span></div></div>}
    </>
  );
};

const Protected = ({ children }) => (isAuthenticated() ? children : <Navigate to="/login" replace />);

export default function App() {
  return (
    <>
      <Nav />
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/" element={<Protected><Invoices /></Protected>} />
          <Route path="/invoices/new" element={<Protected><InvoiceForm /></Protected>} />
          <Route path="/invoices/:id" element={<Protected><InvoiceForm /></Protected>} />
          <Route path="/clients" element={<Protected><Clients /></Protected>} />
        </Routes>
      </main>
    </>
  );
}
