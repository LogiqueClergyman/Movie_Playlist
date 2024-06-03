import { useState, useEffect } from 'react';
import MovieListService from '../services/movieListService';

const Profile = () => {
  const [lists, setLists] = useState([]);
  const [editingList, setEditingList] = useState(null);
  const [newName, setNewName] = useState('');
  const [isPublic, setIsPublic] = useState(true);

  useEffect(() => {
    const fetchLists = async () => {
      const data = await MovieListService.getUserLists();
      setLists(data);
    };

    fetchLists();
  }, []);

  const handleDeleteList = async (listId) => {
    await MovieListService.deleteList(listId);
    setLists(lists.filter((list) => list._id !== listId));
  };

  const handleTogglePublic = async (listId) => {
    const list = lists.find((list) => list._id === listId);
    list.isPublic = !list.isPublic;
    await MovieListService.updateList(listId, list.name, list.movies, list.isPublic);
    setLists([...lists]);
  };

  const handleRenameList = async (listId) => {
    const list = lists.find((list) => list._id === listId);
    await MovieListService.updateList(listId, newName, list.movies, list.isPublic);
    setEditingList(null);
    setNewName('');
    const updatedLists = await MovieListService.getUserLists();
    setLists(updatedLists);
  };

  const handleDeleteItem = async (listId, movieId) => {
    const list = lists.find((list) => list._id === listId);
    list.movies = list.movies.filter((movie) => movie.imdbID !== movieId);
    await MovieListService.updateList(listId, list.name, list.movies, list.isPublic);
    setLists([...lists]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">My Movie Lists</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lists.map((list) => (
          <div key={list._id} className="bg-white p-4 rounded shadow-md">
            <div className="flex justify-between items-center">
              {editingList === list._id ? (
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                />
              ) : (
                <h3 className="text-xl font-semibold">{list.name}</h3>
              )}
              <div>
                {editingList === list._id ? (
                  <button
                    onClick={() => handleRenameList(list._id)}
                    className="ml-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingList(list._id);
                      setNewName(list.name);
                    }}
                    className="ml-2 bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600"
                  >
                    Rename
                  </button>
                )}
                <button
                  onClick={() => handleDeleteList(list._id)}
                  className="ml-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleTogglePublic(list._id)}
                  className={`ml-2 p-2 rounded ${
                    list.isPublic ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
                  } text-white`}
                >
                  {list.isPublic ? 'Public' : 'Private'}
                </button>
              </div>
            </div>
            <ul className="mt-4">
              {list.movies.map((movie) => (
                <li key={movie.imdbID} className="flex justify-between items-center border-b border-gray-200 p-2">
                  <span>{movie.Title} ({movie.Year})</span>
                  <button
                    onClick={() => handleDeleteItem(list._id, movie.imdbID)}
                    className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
