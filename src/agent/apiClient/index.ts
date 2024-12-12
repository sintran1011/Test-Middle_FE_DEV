import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://api.github.com/users/',
  timeout: 14000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
