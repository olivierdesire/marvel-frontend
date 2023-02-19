import { Link, useLocation } from "react-router-dom";
import ListOfComics from "../components/ListOfComics";

const Character = ({ baseURL, favoris, setFavoris, updateCookie }) => {
  const location = useLocation();

  const character = location.state.character;

  const sizeMaxPicture = "/portrait_fantastic.";
  //   const sizeMaxPicture = "/standard_fantastic.";

  let cookieStar = true;
  const indexFavoris = favoris.indexOf(character._id);
  if (indexFavoris === -1) {
    cookieStar = false;
  }

  console.log("tabFavoris", favoris);
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
                  if (cookieStar) {
                    const copyArray = [...favoris];
                    copyArray.splice(indexFavoris, 1);
                    setFavoris(copyArray);
                    updateCookie(copyArray);
                  } else {
                    const copyArray = [...favoris];
                    copyArray.push(character._id);
                    setFavoris(copyArray);
                    updateCookie(copyArray);
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
