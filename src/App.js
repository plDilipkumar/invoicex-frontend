import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Invoices from './pages/Invoices';
import InvoiceForm from './pages/InvoiceForm';
import Clients from './pages/Clients';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { isAuthenticated, logout } from './AuthService';

const Nav = () => (
  <div className="nav">
    <div className="container flex justify-between items-center p-16">
      <div className="brand">InvoiceX</div>
      <div className="flex gap-12">
        {isAuthenticated() ? (
          <>
            <Link to="/">Invoices</Link>
            <Link to="/clients">Clients</Link>
            <button className="btn btn-secondary" onClick={() => { logout(); window.location.href = '/login'; }}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  </div>
);

const Protected = ({ children }) => (isAuthenticated() ? children : <Navigate to="/login" replace />);

export default function App() {
  return (
    <>
      <Nav />
      <div className="container">
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
      </div>
    </>
  );
}


