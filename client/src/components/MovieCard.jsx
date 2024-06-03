
const MovieCard = ({ movie, onAddToList }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="movie-details">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <button onClick={() => onAddToList(movie)}>Add to List</button>
      </div>
    </div>
  );
};

export default MovieCard;
