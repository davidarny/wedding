import axios from "axios";

const apiClient = axios.create({
  baseURL: "/.netlify/functions",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || "Произошла ошибка. Попробуйте позже.";
    return Promise.reject(new Error(message));
  },
);

export default apiClient;
