import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex space-x-4">
        <Link to="/">Invoices</Link>
        <Link to="/add-invoice">Add Invoice</Link>
        <Link to="/clients">Clients</Link>
        <Link to="/add-client">Add Client</Link>
      </div>
    </nav>
  );
};

export default Navbar;
