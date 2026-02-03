import React, { useState, useEffect } from 'react';
import API, { authBase } from '../api';

export default function ResetPassword() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const url = new URL(window.location.href);
    const t = url.searchParams.get('token');
    if (t) setToken(t);
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirm) return setError('Passwords do not match');
    try {
      await API.post(`${authBase}/reset-password`, { token, newPassword });
      setDone(true); setError('');
    } catch (err) { setError('Invalid or expired link'); }
  };

  return (
    <div className="card p-16" style={{ maxWidth: 480, margin: '48px auto' }}>
      <h2 className="mb-16">Reset Password</h2>
      {done ? (
        <div className="success">Password updated. You can now <a href="/login">sign in</a>.</div>
      ) : !token ? (
        <div className="error">Invalid reset link. <a href="/forgot-password">Request new link</a>.</div>
      ) : (
        <form onSubmit={onSubmit} className="flex gap-12" style={{ flexDirection: 'column' }}>
          {error && <div className="error">{error}</div>}
          <div>
            <label>New Password</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} />
          </div>
          <div>
            <label>Confirm Password</label>
            <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={6} />
          </div>
          <button className="btn btn-primary">Reset Password</button>
        </form>
      )}
    </div>
  );
}


