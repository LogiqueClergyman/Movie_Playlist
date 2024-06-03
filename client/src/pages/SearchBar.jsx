import { useState } from 'react';
import MovieService from '../services/movieService';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    if (query.trim() === '') {
      return;
    }

    try {
      const data = await MovieService.searchMovies(query);
      onSearch(data.Search || []);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  };

  return (
    <div className="search-bar flex justify-center mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-purple-950 text-white rounded-r-md hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-950"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
