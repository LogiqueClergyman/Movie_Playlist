import movieListService from "../services/movieListService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
function List() {
  const [details, setDetails] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    const fetchDetails = async () => {
      const response = await movieListService.getList(id);
      setDetails(response);
    };
    fetchDetails();
  }, []);

  return (
    <div>
      {details && (
        <div>
          <h2>{details.name}</h2>
          <ul>
            {details.movies.map((movie) => (
              <li key={movie.imdbID}>{movie.Title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default List;
