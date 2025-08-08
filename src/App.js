import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import InvoiceList from './InvoiceList';
import InvoiceForm from './InvoiceForm';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto mt-6 px-4">
          <Routes>
            <Route path="/" element={<InvoiceList />} />
            <Route path="/add" element={<InvoiceForm />} />
            {/* You can add edit route later if needed */}
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
