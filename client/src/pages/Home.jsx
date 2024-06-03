import { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import AddToListModal from './AddToListModal';
import MovieListService from '../services/movieListService';

const Home = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchLists = async () => {
      const data = await MovieListService.getUserLists();
      setLists(data);
    };

    fetchLists();
  }, []);

  const handleSearch = async (results) => {
    setSearchResults(results);
  };

  const handleAddToList = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMovie(null);
  };

  const handleAddToListSuccess = async () => {
    const data = await MovieListService.getUserLists();
    setLists(data);
    handleCloseModal();
  };

  return (
    <div className="home container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Movie List App</h1>
      <SearchBar onSearch={handleSearch} />
      <MovieList movies={searchResults} onAddToList={handleAddToList} />
      {showModal && selectedMovie && (
        <AddToListModal
          movie={selectedMovie}
          lists={lists}
          onClose={handleCloseModal}
          onAddToListSuccess={handleAddToListSuccess}
        />
      )}
    </div>
  );
};

export default Home;
