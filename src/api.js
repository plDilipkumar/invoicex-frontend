import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE || 'https://invoicex-i3y4.onrender.com';
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('invoicex_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default API;
export const authBase = '/api/auth';
export const invoicesBase = '/api/invoices';
export const clientsBase = '/api/clients';

