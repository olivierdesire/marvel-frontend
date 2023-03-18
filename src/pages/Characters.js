import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Characters = ({
  baseURL,
  search,
  pages,
  favoris,
  setFavoris,
  updateCookie,
}) => {
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
        const response = await axios.get(`${baseURL}/characters${filters}`);
        setData(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [baseURL, search, pages, favoris]);

  console.log("isLoading", isLoading);
  return isLoading ? (
    <div>Downloading</div>
  ) : (
    <div className="characters-page">
      <div className="character-title container">
        <h1>Personnages</h1>
      </div>
      <div className="list-characters container">
        {data.map((element) => {
          let cookieStar = true;
          const indexFavoris = favoris.indexOf(element._id);
          if (indexFavoris === -1) {
            cookieStar = false;
          }
          return (
            <div key={element._id} className="character">
              <Link to="/Character" state={{ character: element }}>
                <img
                  src={
                    element.thumbnail.path +
                    sizePicture +
                    element.thumbnail.extension
                  }
                  alt="character of comics"
                />
              </Link>
              <div className="col-right">
                <p>{element.name}</p>
                {element.description && <p>Description</p>}
                <p>{element.description}</p>
                <button
                  className={
                    cookieStar
                      ? "favoris-characters color-red"
                      : "favoris-characters color-grey"
                  }
                  onClick={() => {
                    if (cookieStar) {
                      const copyArray = [...favoris];
                      copyArray.splice(indexFavoris, 1);
                      setFavoris(copyArray);
                      updateCookie(copyArray);
                    } else {
                      const copyArray = [...favoris];
                      copyArray.push(element._id);
                      setFavoris(copyArray);
                      updateCookie(copyArray);
                    }
                  }}
                >
                  ⭑
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Characters;
