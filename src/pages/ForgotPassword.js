import React, { useState } from 'react';
import API, { authBase } from '../api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post(`${authBase}/forgot-password`, { email });
      setSent(true); setError('');
    } catch (err) { setError('Failed to send reset email'); }
  };

  return (
    <div className="card p-16" style={{ maxWidth: 500, margin: '48px auto' }}>
      <h2 className="mb-16">Forgot Password</h2>
      {sent ? (
        <div className="success">If the email exists, a reset link has been sent.</div>
      ) : (
        <form onSubmit={onSubmit} className="flex gap-12" style={{ flexDirection: 'column' }}>
          {error && <div className="error">{error}</div>}
          <div>
            <label>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <button className="btn btn-primary">Send Reset Link</button>
        </form>
      )}
    </div>
  );
}


