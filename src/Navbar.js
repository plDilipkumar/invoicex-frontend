import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          <Link to="/" className="logo">InvoiceX</Link>
          <Link to="/invoices">Invoices</Link>
          <Link to="/clients">Clients</Link>
        </div>
        <div className="navbar-actions">
          <Link to="/invoices/add">Add Invoice</Link>
          <Link to="/clients/add">Add Client</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
