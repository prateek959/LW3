import axios from "axios";

const api = axios.create({
  baseURL: "https://lw3.onrender.com", // backend base
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 20000
});

export default api;
