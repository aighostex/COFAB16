// /src/api/users.js
import axios from "axios";

const API_URL = "https://confabevent.chroniclesoft.com/api";

//Register (no token required)
export const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data; // { success: true, user: { ... } }
};

//Get Users (requires token)
export const getUsers = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};