import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000", // backend base
  headers: {
    "Content-Type": "application/json"
  },
  timeout: 20000
});

export default api;
