const MovieList = ({ movies, onAddToList }) => {
  console.log(movies);
  const handleAddToList = (movie) => {
    onAddToList(movie);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="flex  flex-col justify-between rounded shadow-md"
        >
          <img
            src={movie.Poster}
            alt=""
            className="h-[350px]  outline-double -outline-offset-8 outline-white"
          />
          <div className="flex border-t-2 justify-between pt-3 px-1 bg-gray-900 bg-opacity-30">
            <h3 className="text-lg text-white pt-2 font-semibold line-clamp-1">
              {movie.Title}
            </h3>
            <div className="cursor-pointer">
              <svg
                clipRule="evenodd"
                fillRule="evenodd"
                strokeLinejoin="round"
                strokeMiterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => handleAddToList(movie)}
                className="h-10 "
              >
                <path
                  d="m20 20h-15.25c-.414 0-.75.336-.75.75s.336.75.75.75h15.75c.53 0 1-.47 1-1v-15.75c0-.414-.336-.75-.75-.75s-.75.336-.75.75zm-1-17c0-.478-.379-1-1-1h-15c-.62 0-1 .519-1 1v15c0 .621.52 1 1 1h15c.478 0 1-.379 1-1zm-9.25 6.75v-3c0-.414.336-.75.75-.75s.75.336.75.75v3h3c.414 0 .75.336.75.75s-.336.75-.75.75h-3v3c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3h-3c-.414 0-.75-.336-.75-.75s.336-.75.75-.75z"
                  fillRule="nonzero"
                />
              </svg>
            </div>
          </div>
          {/* <p className="text-gray-600">{movie.Year}</p> */}
        </div>
      ))}
    </div>
  );
};

export default MovieList;
