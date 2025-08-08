import axios from 'axios';

const BASE_URL = `${process.env.REACT_APP_API_URL}/api/clients`;

const createClient = (clientData) => {
  return axios.post(BASE_URL, clientData);
};

const getAllClients = () => {
  return axios.get(BASE_URL);
};

const clientService = { createClient, getAllClients };

export default clientService;
