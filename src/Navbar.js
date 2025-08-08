
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">InvoiceX</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Invoices</Link>
          <Link to="/add" className="hover:underline">Add Invoice</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
