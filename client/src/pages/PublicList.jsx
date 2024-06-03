import { useEffect, useState } from "react";
import movieListService from "../services/movieListService";
import { useNavigate } from "react-router-dom";

const PublicLists = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const response = await movieListService.getPublicLists();
      setLists(response);
    };

    fetchLists();
  }, []);
  const navigate = useNavigate();

  const handleViewMore = (listId) => {
    navigate(`/list/${listId}`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">
        Public Movie Lists
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4">
        {lists &&
          lists.map((list) => (
            <div className="group " key={list._id}>
              <div
                className="bg-no-repeat group-hover:translate-y-0.5 transition-all duration-300 ease-in-out bg-cover bg-center  h-[250px] flex flex-col justify-between shadow-md"
                style={{ backgroundImage: `url(${list.thumbnail})` }}
              >
                <div className="">
                  <div className="absolute overflow-auto top-0 left-0 w-full h-full bg-white bg-opacity-90 p-5 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:rounded-xl outline -outline-offset-4 outline-1">
                    <div className="flex flex-col h-full justify-between text-gray-800 dark:text-gray-300 duration-700 transition transform ease-in-out group-hover:-translate-y-0 translate-y-4">
                      <div>
                        <h1 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white ">
                          {list.name}
                        </h1>
                        <p className="text-black font-thin mb-4">
                          Curator: {list.userId.username}
                        </p>
                      </div>
                      <div className="flex justify-end duration-700 transition transform ease-in-out">
                        <button
                          onClick={() => handleViewMore(list._id)}
                          className="border-2 border-blue-900 text-sm font-medium text-center text-gray-200  hover:bg-blue-900 hover:text-white p-2 focus:ring-1 rounded-sm px-4 focus:ring-blue-300"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800 bg-opacity-65 h-[100%] flex flex-col justify-center items-center p-2">
                  <h3 className="text-2xl font-semibold mb-2 text-white">
                    {list.name}
                  </h3>
                  </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PublicLists;
