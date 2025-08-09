// src/App.js
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import InvoiceList from "./InvoiceList";
import InvoiceForm from "./InvoiceForm";
import InvoiceEditForm from "./InvoiceEditForm";
import ClientList from "./ClientList";
import ClientForm from "./ClientForm";
import ClientEditForm from "./ClientEditForm";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto mt-6 px-4">
          <Routes>
            {/* Invoice Routes */}
            <Route path="/" element={<InvoiceList />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoices/add" element={<InvoiceForm />} />
            <Route path="/invoices/edit/:id" element={<InvoiceEditForm />} />

            {/* Client Routes */}
            <Route path="/clients" element={<ClientList />} />
            <Route path="/clients/add" element={<ClientForm />} />
            <Route path="/clients/edit/:id" element={<ClientEditForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
