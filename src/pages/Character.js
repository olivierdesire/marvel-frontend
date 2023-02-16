import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import ListOfComics from "../components/ListOfComics";
import Cookies from "js-cookie";

const Character = ({ baseURL }) => {
  const [isFavoris, setIsFavoris] = useState(false);

  const location = useLocation();

  const character = location.state.character;

  const sizeMaxPicture = "/portrait_fantastic.";
  //   const sizeMaxPicture = "/standard_fantastic.";

  let cookieStar = false;
  if (Cookies.get(`${character._id}`)) {
    cookieStar = true;
  }

  return (
    <div className="character-page">
      <div className="container">
        <div className="character-detail">
          <img
            src={
              character.thumbnail.path +
              sizeMaxPicture +
              character.thumbnail.extension
            }
            alt="character"
          />
          <div>
            <div className="col-right">
              <h2> {character.name} </h2>
              <button
                className={
                  cookieStar
                    ? "favoris-character color-red"
                    : "favoris-character color-grey"
                }
                onClick={() => {
                  if (Cookies.get(`${character._id}`)) {
                    Cookies.remove(`${character._id}`);
                    setIsFavoris((current) => !current);
                  } else {
                    Cookies.set(`${character._id}`, character._id);
                    setIsFavoris((current) => !current);
                  }
                }}
              >
                ⭑
              </button>
            </div>
            {character.description && <p> Description</p>}
            <p className="character-description">{character.description}</p>
          </div>
        </div>
        <div className="details-comics">
          <Link to="/ComicsCharacter" state={{ character: character }}>
            <p className="text-comic"> Comics </p>
          </Link>
          <div className="character-right">
            <ListOfComics baseURL={baseURL} character={character} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Character;
