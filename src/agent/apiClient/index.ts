import axios from "axios";

const apiClient = axios.create({
  baseURL: 'https://api.github.com/users/',
  timeout: 14000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `token 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`,
  },
});

export default apiClient;
