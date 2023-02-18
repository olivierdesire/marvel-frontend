import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Characters = ({ baseURL, search, pages, favoris }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [isFavoris, setIsFavoris] = useState(false);

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
  }, [baseURL, search, pages]);

  return isLoading ? (
    <div>Downloading</div>
  ) : (
    <div className="characters-page">
      <div className="character-title container">
        <h1>Personnages</h1>
      </div>
      <div className="list-characters container">
        {data.map((element) => {
          let cookieStar = false;
          if (Cookies.get(`${element._id}`)) {
            cookieStar = true;
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
                    if (Cookies.get(`${element._id}`)) {
                      Cookies.remove(`${element._id}`);
                      favoris.splice(favoris.indexOf(element._id), 1);
                      console.log("favoris", favoris);
                      setIsFavoris((current) => !current);
                    } else {
                      Cookies.set(`${element._id}`, element._id);
                      favoris.push(element._id);
                      console.log("favoris", favoris);
                      setIsFavoris((current) => !current);
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
