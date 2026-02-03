import React, { useState } from 'react';
import { login } from '../AuthService';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      window.location.href = '/';
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="card p-16" style={{ maxWidth: 420, margin: '48px auto' }}>
      <h2 className="mb-16">Sign in to InvoiceX</h2>
      {error && <div className="error mb-16">{error}</div>}
      <form onSubmit={onSubmit} className="flex gap-12" style={{ flexDirection: 'column' }}>
        <div>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary">Login</button>
        <a href="/forgot-password">Forgot your password?</a>
      </form>
    </div>
  );
}


