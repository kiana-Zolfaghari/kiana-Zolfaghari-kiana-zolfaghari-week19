import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3000" });

api.interceptors.response.use(() => {
  (res) => res, (err) => Promise.reject(err);
});

export default api;
