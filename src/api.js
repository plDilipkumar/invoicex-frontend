// src/api.js
import axios from "axios";

let raw = process.env.REACT_APP_API_URL || "http://localhost:8080";
raw = raw.replace(/\/+$/, ""); // remove trailing slash(es)

const API_BASE = raw.endsWith("/api") ? raw : `${raw}/api`;

// axios instance with baseURL set to .../api
export const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

export default API_BASE;
