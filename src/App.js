import React from 'react';
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
  return (
    <header className="nav">
      <div className="container">
        <Link to="/" className="brand"><span className="brand-mark">✦</span><span>InvoiceX</span></Link>
        <nav className="nav-links">
          {signedIn ? (
            <>
              <Link className={location.pathname === '/' || location.pathname.startsWith('/invoices') ? 'active' : ''} to="/">▤ Invoices</Link>
              <Link className={location.pathname.startsWith('/clients') ? 'active' : ''} to="/clients">♙ Clients</Link>
              <button className="btn btn-secondary" onClick={() => { logout(); window.location.href = '/login'; }}>↪ Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Create account</Link>
            </>
          )}
        </nav>
      </div>
    </header>
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
