// src/api/auth.js
import api from "./api";

export const adminLogin = async (email,pasword) => {
  try {
    const response = await api.post('/login', email, pasword);
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('admin', JSON.stringify(response.data.admin));
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('admin');
};