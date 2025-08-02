// /src/api/users.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;;

//Register (no token required)
export const register = async (newRegistration) => {
  const response = await axios.post(`${API_URL}/register`, newRegistration);
  return response.data; // { success: true, user: { ... } }
};

//Get Users (requires token)
export const getUsers = async () => {
  const token = localStorage.getItem("adminAuth");
  const response = await axios.get(`${API_URL}/users`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};