import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Replace with your actual backend URL

const getToken = () => {
  // Retrieve the token from local storage or any other secure storage
  return localStorage.getItem('user');
};

const getUserLists = async () => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/movieLists/user`, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
};
const getPublicLists = async () => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/movieLists/public`, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
}
const createList = async (name, movies, isPublic, thumbnail) => {
  console.log(name, movies, isPublic)
  const token = getToken();
  const response = await axios.post(
    `${API_BASE_URL}/movieLists/create`,
    { name, movies, isPublic, thumbnail },
    {
      headers: { Authorization: `${token}` },
    }
  );
  return response.data;
};

const deleteList = async (listId) => {
  const token = getToken();
  await axios.delete(`${API_BASE_URL}/movieLists/${listId}`, {
    headers: { Authorization: `${token}` },
  });
};

const updateList = async (listId, name, movies, isPublic, thumbnail) => {
  const token = getToken();
  const response = await axios.put(
    `${API_BASE_URL}/movieLists/${listId}`,
    { name, movies, isPublic, thumbnail },
    {
      headers: { Authorization: `${token}` },
    }
  );
  return response.data;
};

const getList = async (listId) => {
  const token = getToken();
  const response = await axios.get(`${API_BASE_URL}/movieLists/${listId}`, {
    headers: { Authorization: `${token}` },
  });
  return response.data;
};

export default {
  getList,
  getPublicLists,
  getUserLists,
  createList,
  deleteList,
  updateList,
};
