import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import InvoiceList from './InvoiceList';
import InvoiceForm from './InvoiceForm';
import ClientForm from './ClientForm';
import ClientList from './ClientList';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto mt-6 px-4">
          <Routes>
            {/* Invoice Routes */}
            <Route path="/" element={<InvoiceList />} />
            <Route path="/add-invoice" element={<InvoiceForm />} />

            {/* Client Routes */}
            <Route path="/clients" element={<ClientList />} />
            <Route path="/add-client" element={<ClientForm />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
