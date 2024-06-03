import axios from 'axios';
const API_URL = 'http://www.omdbapi.com/';
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const searchMovies = async (query) => {
  const response = await axios.get(`${API_URL}?s=${query}&apikey=${API_KEY}`);
  return response.data;
};

const getMovieDetails = async (id) => {
  const response = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`);
  return response.data;
};

export default {
  searchMovies,
  getMovieDetails,
};
