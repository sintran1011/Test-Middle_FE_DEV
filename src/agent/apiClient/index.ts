import { API_URL } from "@/global/config/common.config";
import axios from "axios";

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 14000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
