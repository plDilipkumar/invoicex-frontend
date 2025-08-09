// src/ClientService.js
import { axiosInstance } from "./api";

const BASE = "/clients";

const getAllClients = () => axiosInstance.get(BASE);
const getClientById = (id) => axiosInstance.get(`${BASE}/${id}`);
const createClient = (data) => axiosInstance.post(BASE, data);
const updateClient = (id, data) => axiosInstance.put(`${BASE}/${id}`, data);
const deleteClient = (id) => axiosInstance.delete(`${BASE}/${id}`);

export default {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
};
