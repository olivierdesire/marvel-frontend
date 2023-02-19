import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Favoris = ({ baseURL, favoris, setFavoris, updateCookie }) => {
  const [dataCharacters, setDataCharacters] = useState(null);
  const [dataComics, setDataComics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const sizePictureCharacter = "/portrait_incredible.";
  const sizePictureComic = "/portrait_uncanny.";

  useEffect(() => {
    const fetchData = async () => {
      let tabDataCharacters = [];
      let tabDataComics = [];

      for (let i = 0; i < favoris.length; i++) {
        try {
          const response = await axios.get(
            `${baseURL}/character/${favoris[i]}`
          );
          if (response.data) {
            tabDataCharacters.push(response.data);
          }
        } catch (error) {
          console.log("error", error);
        }
        try {
          const response = await axios.get(`${baseURL}/comic/${favoris[i]}`);
          if (response.data) {
            tabDataComics.push(response.data);
          }
        } catch (error) {
          console.log("error", error);
        }
        setDataCharacters(tabDataCharacters);
        setDataComics(tabDataComics);
        setIsLoading(false);
      }
    };
    fetchData();
  }, [baseURL, favoris]);

  return isLoading ? (
    <div>Downloading</div>
  ) : (
    <div>
      <div className="characters-page">
        <div className="favoris-character-title container">
          <h1>Personnages</h1>
        </div>
        <div className="list-characters container">
          {dataCharacters.map((element) => {
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
                      sizePictureCharacter +
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
                      const copyArray = [...favoris];
                      copyArray.splice(indexFavoris, 1);
                      setFavoris(copyArray);
                      updateCookie(copyArray);
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
      <div className="favoris-comic-page">
        <div className="favoris-comic-title container">
          <h1>Comics</h1>
        </div>
        <div className="list-comics container">
          {dataComics.map((element) => {
            let cookieStar = true;
            const indexFavoris = favoris.indexOf(element._id);
            if (indexFavoris === -1) {
              cookieStar = false;
            }
            return (
              <div key={element._id} className="comic">
                <img
                  src={
                    element.thumbnail.path +
                    sizePictureComic +
                    element.thumbnail.extension
                  }
                  alt="One comic"
                />
                <div className="col-right">
                  <p>{element.title}</p>
                  {element.description && <p>Description</p>}
                  <div className="overflow-description">
                    <p>{element.description}</p>
                  </div>
                  <button
                    className={
                      cookieStar
                        ? "favoris-comics color-red"
                        : "favoris-comics color-grey"
                    }
                    onClick={() => {
                      const copyArray = [...favoris];
                      copyArray.splice(indexFavoris, 1);
                      setFavoris(copyArray);
                      updateCookie(copyArray);
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
    </div>
  );
};

export default Favoris;
