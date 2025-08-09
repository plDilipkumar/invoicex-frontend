// src/InvoiceService.js
import { axiosInstance } from "./api";

const BASE = "/invoices";

const getAllInvoices = () => axiosInstance.get(BASE);
const getInvoiceById = (id) => axiosInstance.get(`${BASE}/${id}`);
const createInvoice = (data) => axiosInstance.post(BASE, data);
const updateInvoice = (id, data) => axiosInstance.put(`${BASE}/${id}`, data);
const deleteInvoice = (id) => axiosInstance.delete(`${BASE}/${id}`);

export default {
  getAllInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
};
