import { useState, useEffect } from "react";
import MovieListService from "../services/movieListService";

const AddToListModal = ({ movie, lists, onClose, onAddToListSuccess }) => {
  const [selectedList, setSelectedList] = useState("");
  const [creatingList, setCreatingList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(false);

  useEffect(() => {
    if (selectedList) {
      const list = lists.find((list) => list._id === selectedList);
      if (list) {
        const movieExists = list.movies.some((m) => m.imdbID === movie.imdbID);
        setIsDuplicate(movieExists);
      }
    } else {
      setIsDuplicate(false);
    }
  }, [selectedList, lists, movie]);

  const handleAddToList = async () => {
    if (selectedList && !isDuplicate) {
      const list = lists.find((list) => list._id === selectedList);
      if (list) {
        list.movies.push(movie);
        if (list.movies.length === 1) {
          list.thumbnail = movie.Poster;
        }
        await MovieListService.updateList(
          selectedList,
          list.name,
          list.movies,
          list.isPublic,
          list.thumbnail
        );
      }
    } else if (!selectedList) {
      const thumbnail = movie.Poster;
      const newList = await MovieListService.createList(
        newListName,
        [movie],
        isPublic,
        thumbnail
      );
      // Update the lists state with the new list
      onAddToListSuccess(newList);
    }
    onClose();
  };

  const handleCreateList = () => {
    setCreatingList(true);
  };

  const handleSaveList = async () => {
    const thumbnail = movie.Poster;
    const newList = await MovieListService.createList(
      newListName,
      [movie],
      isPublic,
      thumbnail
    );
    // Update the lists state with the new list
    onAddToListSuccess(newList);
    setCreatingList(false);
    setNewListName("");
    setIsPublic(true);
    setSelectedList(newList._id);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-md w-96">
        {!creatingList ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Add to List</h2>
            <select
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="">Select a List</option>
              {lists.map((list) => (
                <option key={list._id} value={list._id}>
                  {list.name}
                </option>
              ))}
            </select>
            <button
              onClick={handleCreateList}
              className="w-full mb-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Create New List
            </button>
            <button
              onClick={handleAddToList}
              disabled={isDuplicate}
              className={`w-full p-2 rounded ${
                isDuplicate
                  ? "bg-gray-500 text-white"
                  : "bg-green-500 text-white hover:bg-green-600"
              }`}
            >
              {isDuplicate ? "Already Exists" : "Add"}
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Create New List</h2>
            <input
              type="text"
              placeholder="List Name"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="mr-2"
              />
              Public List
            </label>
            <button
              onClick={handleSaveList}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white p-2 rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddToListModal;
