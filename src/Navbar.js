// src/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link to="/" className="font-bold text-lg">InvoiceX</Link>
          <Link to="/invoices">Invoices</Link>
          <Link to="/clients">Clients</Link>
        </div>
        <div className="flex items-center space-x-3">
          <Link to="/invoices/add" className="bg-blue-500 px-3 py-1 rounded">Add Invoice</Link>
          <Link to="/clients/add" className="bg-blue-500 px-3 py-1 rounded">Add Client</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
