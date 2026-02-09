import React, { useState } from 'react';
import { register, login } from '../AuthService';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) return setError('Passwords do not match');
    setLoading(true);
    try {
      await register(username, email, password);
      await login(username, password);
      window.location.href = '/';
    } catch (err) {
      setError(err?.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="card p-16" style={{ maxWidth: 520, margin: '48px auto' }}>
      <h2 className="mb-16">Create your account</h2>
      {error && <div className="error mb-16">{error}</div>}
      <form onSubmit={onSubmit} className="flex gap-12" style={{ flexDirection: 'column' }}>
        <div>
          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div>
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} required minLength={6} />
        </div>
        <button disabled={loading} className="btn btn-primary">{loading ? 'Creating…' : 'Create account'}</button>
      </form>
    </div>
  );
}


