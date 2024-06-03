import axios from "axios";

const API_URL =
  "https://movie-plylistserver-9xoi053co-logiqueclergymans-projects.vercel.app/api/auth";

const register = async (username, password) => {
  const response = await axios.post(`${API_URL}/register`, {
    username,
    password,
  });
  if (response.data.token) {
    localStorage.setItem("user", response.data.token);
  }
  return response.data;
};

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, { username, password });
  if (response.data.token) {
    localStorage.setItem("user", response.data.token);
  }
  return response.data;
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return localStorage.getItem("user");
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};
