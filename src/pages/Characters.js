import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = ({ search, pages }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sizePicture = "/portrait_incredible.";

  useEffect(() => {
    const fetchData = async () => {
      let filters = "";
      if (pages > 1 && !search) {
        filters = "?skip=" + (pages - 1) * 100;
      } else {
        if (search) {
          filters = "?name=" + search;
        }
      }
      try {
        const response = await axios.get(
          `https://site--marvel-backend--97yqlpf4l44b.code.run/characters${filters}`
          // `http://localhost:3001/characters${filters}`
        );
        // console.log("response.data >>", response.data.results);
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [search, pages]);

  return isLoading ? (
    <div>Downloading</div>
  ) : (
    <div className="characters-page">
      <div className="character-title container">
        <h1>Personnages</h1>
      </div>
      <div className="list-characters container">
        {data.map((element) => {
          return (
            <Link
              key={element._id}
              to="/Character"
              state={{ character: element }}
            >
              <div className="character">
                <img
                  src={
                    element.thumbnail.path +
                    sizePicture +
                    element.thumbnail.extension
                  }
                  alt="character of comics"
                />
                <div>
                  <p>{element.name}</p>
                  {element.description && <p>Description</p>}
                  <p>{element.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
