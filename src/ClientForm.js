import React, { useState } from 'react';
import clientService from './ClientService';

const ClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await clientService.createClient(formData);
      setMessage('Client created successfully!');
      setFormData({ name: '', email: '', address: '' });
    } catch (error) {
      setMessage('Error creating client');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Create Client</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Client Name" value={formData.name} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Client Email" value={formData.email} onChange={handleChange} required />
        <input type="text" name="address" placeholder="Client Address" value={formData.address} onChange={handleChange} required />
        <button type="submit">Create Client</button>
      </form>
    </div>
  );
};

export default ClientForm;
