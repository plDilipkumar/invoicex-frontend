import API, { authBase } from './api';

export async function register(username, email, password) {
  const { data } = await API.post(`${authBase}/register`, { username, email, password });
  return data;
}

export async function login(username, password) {
  const { data } = await API.post(`${authBase}/login`, { username, password });
  if (data?.token) {
    localStorage.setItem('invoicex_token', data.token);
    localStorage.setItem('invoicex_username', data.username || username);
  }
  return data;
}

export function logout() {
  localStorage.removeItem('invoicex_token');
  localStorage.removeItem('invoicex_username');
}

export const isAuthenticated = () => Boolean(localStorage.getItem('invoicex_token'));

